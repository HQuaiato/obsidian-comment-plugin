import { App, Editor, MarkdownView, Modal, Notice, Plugin } from "obsidian";

export default class CommentPlugin extends Plugin {
  async onload() {
    console.log("Plugin de Comentário Carregado!");
    this.injectStyles();

    this.addCommand({
      id: "add-comment",
      name: "Adicionar Comentário",
      hotkeys: [{ modifiers: ["Ctrl"], key: "+" }],
      editorCallback: this.addComment.bind(this),
    });

    this.addCommand({
      id: "remove-comment",
      name: "Remover Comentário",
      hotkeys: [{ modifiers: ["Ctrl"], key: "-" }],
      editorCallback: this.removeComment.bind(this),
    });

    this.registerDomEvent(document, "mouseover", this.handleMouseOver.bind(this));
    this.registerDomEvent(document, "mouseout", this.handleMouseOut.bind(this));
  }

  private injectStyles() {
    const style = document.createElement("style");
    style.textContent = `
      .comment {
        border-bottom: 2px dashed #4a90e2;
        color: #ffffff;
        font-style: italic;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      .comment:hover {
        border-bottom-color: #357abd;
        background-color: rgba(255, 255, 255, 0.1);
      }
      .comment-tooltip {
        background-color: #1e1e1e;
        border: 1px solid #444444;
        color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        padding: 10px;
        font-family: Arial, sans-serif;
        font-size: 14px;
        z-index: 9999;
      }
      .comment-button {
        background-color: #1e1e1e;
        color: #ffffff;
        border: 1px solid #353535;
        border-radius: 4px;
        padding: 5px 10px;
        cursor: pointer;
        margin-top: 5px;
        transition: background-color 0.3s ease;
      }
      .comment-button:hover {
        background-color: #181818;
      }
    `;
    document.head.appendChild(style);
  }

  private addComment(editor: Editor) {
    const selectedText = editor.getSelection();
    if (!selectedText) {
      new Notice("Selecione um texto para comentar.");
      return;
    }

    new CommentModal(this.app, (comment) => {
      editor.replaceSelection(`<span class="comment" data-comment="${comment}" style="border-bottom: 1px dotted; cursor: pointer;">${selectedText}</span>`);
    }).open();
  }

  private removeComment(editor: Editor) {
    const cursor = editor.getCursor();
    const line = editor.getLine(cursor.line);
    editor.replaceRange(line.replace(/<span class="comment"[^>]*>(.*?)<\/span>/g, "$1"), { line: cursor.line, ch: 0 }, { line: cursor.line, ch: line.length });
  }

  private handleMouseOver(evt: MouseEvent) {
    const target = evt.target as HTMLElement;
    if (target instanceof HTMLElement && target.classList.contains("comment")) {
      this.showTooltip(target, target.getAttribute("data-comment") || "");
    }
  }

  private handleMouseOut(evt: MouseEvent) {
    const relatedTarget = evt.relatedTarget as HTMLElement | null;
    if (!relatedTarget || (!relatedTarget.closest(".comment") && !relatedTarget.closest(".comment-tooltip"))) {
      this.hideTooltip();
    }
  }

  private showTooltip(target: HTMLElement, comment: string) {
    const tooltip = document.createElement("div");
    tooltip.classList.add("comment-tooltip"); // Aplicando a classe comment-tooltip
    tooltip.innerHTML = `<div class="comment-tooltip-content"><p>${comment}</p><button class="comment-button edit-comment">Editar</button></div>`;
    Object.assign(tooltip.style, {
      position: "absolute",
      top: `${target.getBoundingClientRect().top - 80}px`,
      left: `${target.getBoundingClientRect().left + 20}px`,
      pointerEvents: "all",
    });
    document.body.appendChild(tooltip);

    tooltip.querySelector(".edit-comment")?.addEventListener("click", () => {
      this.editComment(target, comment, tooltip);
    });
  }

  private hideTooltip() {
    document.querySelectorAll(".comment-tooltip").forEach((tooltip) => tooltip.remove());
  }

  private editComment(target: HTMLElement, comment: string, tooltip: HTMLElement) {
    new EditCommentModal(this.app, comment, (newComment) => {
      if (newComment) {
        target.setAttribute("data-comment", newComment);
        tooltip.querySelector("p")!.textContent = newComment;
      }
      tooltip.remove();
    }).open();
  }
}

class CommentModal extends Modal {
  constructor(app: App, protected onSubmit: (comment: string) => void) {
    super(app);
  }

  onOpen() {
    this.contentEl.createEl("h2", { text: "Adicionar Comentário" });
    const input = this.createInput();
    this.createButton("Salvar", () => {
      const newComment = input.value.trim();
      if (newComment) {
        this.onSubmit(newComment);
        this.close();
      } else {
        new Notice("Por favor, insira um comentário.");
      }
    });
  }

  protected createInput(): HTMLTextAreaElement {
    const input = this.contentEl.createEl("textarea", { placeholder: "Digite seu comentário..." });
    Object.assign(input.style, { width: "100%", height: "100px" });
    return input;
  }

  protected createButton(text: string, onClick: () => void) {
    const button = this.contentEl.createEl("button", { text });
    button.classList.add("comment-button");
    button.addEventListener("click", onClick);
    this.contentEl.appendChild(button);
  }

  onClose() {
    this.contentEl.empty();
  }
}

class EditCommentModal extends CommentModal {
  constructor(app: App, private currentComment: string, onSubmit: (comment: string) => void) {
    super(app, onSubmit);
  }

  onOpen() {
    this.contentEl.createEl("h2", { text: "Editar Comentário" });
    const input = this.createInput();
    input.value = this.currentComment;
    this.createButton("Salvar", () => {
      const newComment = input.value.trim();
      if (newComment) {
        this.onSubmit(newComment);
        this.close();
      } else {
        new Notice("Por favor, insira um comentário.");
      }
    });
  }
}
