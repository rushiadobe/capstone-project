
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
        const alldetails = document.createElement('div');
        alldetails.className = 'cards-card-body';
        const picture = document.createElement('picture');
        const img = document.createElement('img');

        const title = document.createElement('strong');
        const price = document.createElement('p');
        const description = document.createElement('p');

        //assigned data to varibles  
        img.src = data.image;;
        picture.append(img);
        title.innerHTML = data.title;
        price.innerHTML = data.price;
        description.innerHTML = data.description;

        //appended to divcontsiner image 
        alldetails.append(picture);

        //appended to card body title and description
        alldetails.append(title);
        alldetails.append(price);
        alldetails.append(description);
        li.append(alldetails);
        containerul.append(li);
    });
    block.textContent = '';
    block.append(containerul);
}
