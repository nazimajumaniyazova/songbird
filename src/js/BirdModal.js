import { Modal } from './Modal.js';

export class BirdModal extends Modal {
    constructor (classes, { id, name, image, species, description, date, audio }) {
        super(classes);
        this.id = id;
        this.title =  name;
        this.urlToImage = image;
        this.tags = species;
        this.content = description;
        this.date = date;
        this.audiLink = audio;
    }

    // Article Modal generator
    generateContent() {
        let template = '';
        let article = document.createElement('div');
        article.className = 'article-modal__content';

        this.urlToImage && 
        (template += `<img class="strategy__image" src=${this.urlToImage} alt="strategy">`)

        if (this.title || this.tags || this.content || this.date) {
            template += `<div class="strategy__content">`
            
            this.date && 
            (template += `<p class="strategy__date">${this.date}</p>`)

            this.title && 
            (template += `<h3 class="strategy__name">${this.title}</h3>`)

            if(this.tags) {
              template += `<div class="strategy__tags tags">`
                  template += `<span class="tag tag_colored">${this.tags}</span>`
              template += `</div>`
            }
            this.audiLink && 

            (template += `
              <div class = "modal-audio">
                <audio controls>
                <source src="${this.audiLink}" type="audio/mp3">
                </audio>
              </div>
            `)
            this.content && 
            (template += `<p class="strategy__text">${this.content}</p>`)

            template += `</div>`
        }

        article.innerHTML = template;
        return article;
    }

    renderModal() {
        let content = this.generateContent();
        console.log(content)
        super.buildModal(content);
    }
}