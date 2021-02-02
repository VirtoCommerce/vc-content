function BlogItem(item) {
    this.url = item.url;
    this.imageUrl = item.imageUrl;
    this.title = item.title;
    this.excerpt = item.excerpt;
    this.publishedDate = item.publishedDate;
    this.tags = item.tags;
    this.author = item.metaFields.author || item.author;
}

BlogItem.prototype.toHTML = function () {
    var monthsNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var date = new Date(this.publishedDate);

    var authorName = 'VirtoCommerce';
    if (this.author) {
        if (this.author.firstName && this.author.lastName) {
            authorName = `${this.author.firstName} ${this.author.lastName}`;
        }
        if (this.author.name) {
            authorName = this.author.name;
        }
    }

    var photoUrl = '/themes/assets/logo-mobile.svg';
    var photoStyle = '';
    if (this.author && this.author.photoUrl) {
        photoUrl = this.author.photoUrl;
        photoStyle = 'style="max-height:100%;border-radius:100%;"';
    }

    return `<div class="list__item">
        <a class="list__bg lazyload" href="${this.url}" data-bg="${this.imageUrl}?tr=w-343,h-160" style="background-image: url('${this.imageUrl}?tr=w-343,h-160');"></a>
        <div class="list__info">
            <div class="list__t">
                <a href="${this.url}">${this.title}</a>
            </div>
            <div class="list__descr">
                <a class="list__descr" href="${this.url}">${this.excerpt}</a>
                <div class="block__space"></div>
                <div>${date.getDate()} ${monthsNames[date.getMonth()]} ${date.getFullYear()}</div>
            </div>
            <div class="list list--tags">
                ${this.tags.map(element => `<a class="list__item" data-name="${element}">${element.capitalize()}</a>`).join('')}
            </div>
            <div class="list__author">
                <div class="list__author-logo">
                    <img data-src="${photoUrl}" ${photoStyle} class="lazyload" src="${photoUrl}" />
                </div>
                <div class="list__author-text">
                    <div class="list__author-name">${authorName}</div>
                </div>
            </div>
        </div>
    </div>`;
}

String.prototype.capitalize = function () {
    if (this.length === 1) {
        return this[0].toUpperCase();
    }
    if (this.length > 1) {
        return this[0].toUpperCase() + this.slice(1);
    }
    return '';
}
