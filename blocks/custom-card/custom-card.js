import { createOptimizedPicture } from '../../scripts/aem.js';

async function getAlllist() {
    // Fetch the JSON data from the file
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const jsonData = await response.json();
        //console.log(jsonData);
        return jsonData;
    } catch (error) {
        console.error('Error fetching JSON:', error)
    }
}

export default async function decorate(block) {
    //got json data
    const articleData = await getAlllist();

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
        const price = document.createElement('p');
        const description = document.createElement('p');

        //assigned data to varibles  
        img.src = data.image;;
        //console.log(img.src);
        picture.append(img);
        
        strong.innerHTML = data.title;
        price.innerHTML = data.price;
        description.innerHTML = data.description;

        //appended to divcontsiner image 
        divcontsiner.append(img);

        //appended to card body title and description
        divbody.append(strong);
        divbody.append(price);
        divbody.append(description);
       

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
