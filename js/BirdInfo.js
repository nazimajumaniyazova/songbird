export  default class BirdCard{
  constructor(birdInfo, ...classes){
    this.classes = classes; //this classes is an array
    //console.log(classes)
    this.birdInfo = birdInfo;
    this.card = '';
    this.img = '';
    this.name = '';
    this.specie = '';
    this.description = '';
  }
  buildCard(){
    this.card = this.createDomNode(this.card, 'div', this.classes);

    this.setContent(this.card, this.createImage())
    
    let birdInfoBlock = '';
    birdInfoBlock = this.createDomNode(birdInfoBlock,'div', 'bird__info');

    this.name = this.createDomNode(this.name, 'p', 'bird__name');
    this.setContent(this.name, this.birdInfo.name);
    this.setContent(birdInfoBlock, this.name);


    this.specie = this.createDomNode(this.specie, 'p', 'bird__specie');
    this.setContent(this.specie, this.birdInfo.species);
    this.setContent(birdInfoBlock, this.specie);

  
    this.description = this.createDomNode(this.descp, 'div');
    this.setContent(this.description, this.birdInfo.description)
  //  this.setContent(this.card, this.description);

    this.setContent(this.card, birdInfoBlock)
    //console.log(this.card)
    return this.card
  }
  createDomNode(node, tagName, classes){
    node = document.createElement(tagName);
    if(typeof classes != 'string' && classes){
      classes.forEach(element => {
        node.classList.add(element)
      });
    }else{
      node.classList.add(classes)
    }
    return node;
  }
  setContent(node, nodeContent){
    if(typeof nodeContent === 'string') {
      node.innerHTML = nodeContent;
    } else {
      node.appendChild(nodeContent);
    }
  }
  createImage(){
    let img = new Image();
    img.src = this.birdInfo.image
    img.setAttribute('alt', `${this.birdInfo.name} ${this.birdInfo.species}`)
    return img
  }
}