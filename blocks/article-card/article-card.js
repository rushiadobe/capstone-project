import { createOptimizedPicture } from '../../scripts/aem.js';

async function getCardlist(articalURL) {
    // Fetch the JSON data from the file
    try {
        const response = await fetch(articalURL);
        const jsonData = await response.json();
        const fData = jsonData.data.filter((data) => data.template === "articles");
        //console.log(fData);
        return fData;
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
        const alldetails = document.createElement('div');
        alldetails.className = 'cards-card-body';
        const picture = document.createElement('picture');
        const img = document.createElement('img');

        //created div for card body
        const title = document.createElement('strong');
        const description = document.createElement('p');

        //assigned data to varibles
        img.src = data.image
        picture.append(img)
        title.innerHTML = data.title;
        description.innerHTML = data.description;

        //appended and optimized image
        const pictureElement = createOptimizedPicture(data.image, data.title);
        alldetails.appendChild(pictureElement);

        //appended to card body title and description
        alldetails.append(title);
        alldetails.append(description);

        li.append(alldetails);
        li.append(alldetails);
        containerul.append(li);
    });
    block.textContent = '';
    block.append(containerul);
}
