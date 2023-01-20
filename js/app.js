// category Data load 
fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => newsCategory(data.data.news_category))
    .catch((error) => {
        // Handle the error
        console.log(error);
    });

// All category Name Show 
const newsCategory = (categories) => {
    const categoryEliments = document.getElementById('category');
    categories.forEach(category => {
        const Categorysitem = document.createElement('div');

        Categorysitem.innerHTML = `
        <button onclick="LoadNews('${category.category_id
            }')" type="button" class="btn btn-primary">${category.category_name}</button>
        `;
        categoryEliments.appendChild(Categorysitem);
        // console.log(category)
    });

}
// spinnar 
const lodingSpinnar = isLoading => {
    const lodar = document.getElementById('spinnar');
    if (isLoading) {
        lodar.classList.remove('d-none');

    }
    else {
        lodar.classList.add('d-none');
    }
}

// all newses data load 
const LoadNews = (category_id) => {
    const url = ` https://openapi.programming-hero.com/api/news/category/${category_id}`;
    lodingSpinnar(true);
    fetch(url)
        .then(res => res.json())
        .then(data => showNews(data.data))
        .catch((error) => {
            // Handle the error
            console.log(error);
        });
}

const showNews = newses => {
    // show the length of news 
    const totalNewsItem = newses.length;
    const newsLength = document.getElementById('news-length');
    newsLength.textContent = ``;
    const showNewsLengthDiv = document.createElement('div');
    showNewsLengthDiv.innerHTML = `
        <h3> Total News = ${totalNewsItem ? totalNewsItem : 'No News'}</h3>
        `;
    newsLength.appendChild(showNewsLengthDiv);
    // 
    const newsItem = document.getElementById('news-item');
    newsItem.textContent = '';

    // No data Found 
    const nodata = document.getElementById('no-data');
    if (newses.length === 0) {
        nodata.classList.remove('d-none');
        lodingSpinnar(true);
    }
    else {
        nodata.classList.add('d-none');
    }
    // show News 
    newses.forEach(news => {
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `
            <div class="row g-0 m-3 shadow p-3 mb-5 bg-body rounded">
                <div class="col-md-4">
                    <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8 ms-0">
                    <div class="card-body">
                        <h5 class="card-title">${news.title}</h5>
                        <p class="card-text">${(news.details).slice(0, 250)}...</p>
                        <div class="d-flex justify-content-around">
                            <div class="d-flex">
                                <img class="rounded" height="30px" width="30px" src="${news.author.img}" alt="">
                                    <h6 class="m-2">${news.author.name ? news.author.name : "No Data Found"}</h6 >
                            </div>
                            <div>
                                <p> <i class="fas fa-eye"></i> ${news.total_view ? news.total_view : "No Data Found"}</p>
                            </div>
                            <button onclick="showMore('${news._id}')" data-bs-toggle="modal" data-bs-target="#exampleModal" type="button" class="btn btn-primary">Show More</button>
                        </div >
                    </div >
                </div >
            </div >
    </div >
    `;

        newsItem.appendChild(newsDiv);
        // console.log(news)
    })
    lodingSpinnar(false);
};


// Modal data Load 
const showMore = (news_id) => {
    const url = ` https://openapi.programming-hero.com/api/news/${news_id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => modalShow(data.data[0]))
        .catch((error) => {
            // Handle the error
            console.log(error);
        });
}
// show Modal 
const modalShow = modal => {
    const activeModal = document.getElementById('modal')
    const modalItem = document.createElement('div');
    modalItem.innerHTML = `
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">${modal.title}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <img src="${modal.thumbnail_url}" alt="">
        <p> ${modal.details}</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        
      </div>
    </div>
  </div>
</div>
    `;
    // console.log(modal);
    activeModal.appendChild(modalItem);
}

// showBlog
document.getElementById('blog-button').addEventListener('click', showBlog => {
    const blog = document.getElementById('blog');
    blog.classList.remove('d-none');

})