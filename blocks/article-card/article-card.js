import { createOptimizedPicture } from '../../scripts/aem.js';

async function getCardlist(articalURL) {
    // Fetch the JSON data from the file
    try {
        const response = await fetch(articalURL);
        const jsonData = await response.json();
        return jsonData.data;
    } catch (error) {
        console.error('Error fetching JSON:', error)
    }
}

export default async function decorate(block) {
    //got json url and data
    const articles = block.querySelector('a[href$=".json"]');
    const articalURL = articles.href;
    const articleData = await getCardlist(articalURL);

    //for append data declare ul
    const containerul = document.createElement('ul');

    articleData.forEach((data) => {
        const li = document.createElement('li');

        //created div for image 
        const divcontsiner = document.createElement('div');
        const picture = document.createElement('picture');
        const img = document.createElement('img');

        //created div for card body
        const divbody = document.createElement('div');
        const strong = document.createElement('strong');
        const description = document.createElement('p');

        //assigned data to varibles
        img.src = data.image
        picture.append(img)
        strong.innerHTML = data.title;
        description.innerHTML = data.description;

        //appended to card body title and description
        divbody.append(strong);
        divbody.append(description);

        //appended and optimized image
        const pictureElement = createOptimizedPicture(data.image, data.title);
        divcontsiner.appendChild(pictureElement);

        li.append(divcontsiner);
        li.append(divbody);
        containerul.append(li);
    });

    const li = containerul.querySelector('li');
    [...li.children].forEach((div) => {
        if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
        else div.className = 'cards-card-body';
    });

    containerul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
    block.textContent = '';
    block.append(containerul);
}
