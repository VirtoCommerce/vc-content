var capitalize = function (str) {
    if (str) {
        if (str.length === 1) {
            return str[0].toUpperCase();
        }
        if (str.length > 1) {
            return str[0].toUpperCase() + str.slice(1);
        }
    }
    return '';
}

function BlogItem(item) {
    this.url = item.url;
    this.imageUrl = item.imageUrl || '';
    this.title = item.metaFields.articleTitle;
    this.publishedDate = item.publishedDate;
    this.tags = item.tags;
    this.author = item.metaFields.author || item.author;

    var monthsNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']; 

    this.toHTML = function () {
        var date = new Date(this.publishedDate);
        var datesDifference = new Date().getTime() - date.getTime();
        var daysDifference = Math.floor(datesDifference / (1000 * 3600 * 24));
        var dateInfo = '';
        if (daysDifference > 7) {
            dateInfo = `${date.getDate()} ${monthsNames[date.getMonth()].slice(0, 3)} • 5 min`;
        } else {
            if (daysDifference === 0) {
                dateInfo = 'Today • 5 min';
            } else {
                dateInfo = `${daysDifference} days ago • 5 min`;
            }
        }

        return `<div class="list__item">
            <a class="list__bg lazyload" href="${this.url}" data-bg="${this.imageUrl}?tr=w-343,h-160" style="background-image: url('${this.imageUrl}?tr=w-343,h-160');"></a>
            <div class="list__info">
                <div class="list__descr">
                    <div class="article-date">${dateInfo}</div>
                </div>
                <div class="list__t">
                    <a href="${this.url}">${this.title}</a>
                </div>
            </div>
        </div>`;
    }
}
