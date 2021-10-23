function loadMore() {
  let cardsToDisplay = $("#news").attr("data-card-display");
  let cardsToLoad = $("#news").attr("data-card-load");
  $(".cards").slice(0, cardsToDisplay).show();
  $("#load-more").click(function () {
    $(".cards:hidden").slice(0, cardsToLoad).slideDown();
    if ($(".cards:hidden").length == 0) {
      $("#load-more").fadeOut('slow');
    }
  });
}

const appKey = "x7DxoA94zWGjK679aVbtOZv6rdDSzE9G";
$(window).on("load", function () {
  $.ajax({
    url: `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=politics&api-key=${appKey}`,
    method: "GET",
    success: function (data) {
      $.each(data.response.docs, function (key, value) {
        let html = ` <section class="cards">
                  <div class="row row-1">
                        <div class="col-lg-5 col-md-5 col-sm-12 px-0">
                            <a href = ${value.web_url}>
                                <img src="https://static01.nyt.com/${value.multimedia[0].url}" alt="${value.snippet}" class="img-fluid" />
                            </a>
                        </div>
                        <div class="col-lg-7 col-md-7 col-sm-12 d-flex justify-content-center flex-column px-0 br-right">
                            <div class="news-builder-content p-4">
                                <h3>${value.headline.main}</h3>
                                <h4>${value.snippet}</h4>
                                <h5>${value.source}</h5>
                                <span>${value.pub_date}</span>
                                <p>${value.lead_paragraph}</p>
                                <a href=${value.web_url} class="btn btn-primary btn-builder-news">Read More</a>
                                <a class = "btn btn-builder-news btn-tweet"
                                target = "_blank"
                                href = "https://twitter.com/intent/tweet?text=${value.web_url}"
                                rel = "nooperner noreferrer" > Tweet <i class = "fab fa-twitter"></i></a >
                            </div>
                        </div>
</div>
</section>
`;

        $("#news").append(html);
      });
      loadMore();
    },
    error: function (error) {
      console.log(error);
    },
  });
});

$("#search").keyup(function (event) {
  $("#news").html("");
  event.preventDefault();
  newsName = $("#search").val();
  $.ajax({
    url: `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${newsName}&api-key=${appKey}`,
    method: "GET",
    success: function (data) {
      $.each(data.response.docs, function (key, value) {
        let html = ` <section class="cards">
        <div class="row row-1">
                        <div class="col-lg-5 col-md-5 col-sm-12  px-0">
                            <a href = ${value.web_url}>
                                <img src="https://static01.nyt.com/${value.multimedia[0].url}" alt="${value.snippet}" class="img-fluid" />
                            </a>
                        </div>
                        <div class="col-lg-7 col-md-7 col-sm-12 d-flex justify-content-center flex-column px-0 br-right">
                            <div class="news-builder-content p-4">
                                <h3>${value.headline.main}</h3>
                                <h4>${value.snippet}</h4>
                                <h4>${value.source}</h4>
                                <span>${value.pub_date}</span>
                                <p>${value.lead_paragraph}</p>
                                <a href=${value.web_url} class="btn btn-primary btn-builder-news">Read More</a>
                                <a class = "btn btn-builder-news btn-tweet"
                                target = "_blank"
                                href = "https://twitter.com/intent/tweet?text=${value.web_url}"
                                rel = "nooperner noreferrer"> Tweet <i class = "fab fa-twitter"> </i></a>
                                </div>
                        </div>
</div>
</section>
`;
        $("#news").append(html);
      });
      loadMore();
    },
    error: function (error) {
      console.log(error);
    },
  });
});



$("#regions").change(function (event) {
  $("#news").html("");
  $("#load-more").css('display', 'none');
  event.preventDefault();
  newsName = $("#regions option:selected").val();
  $.ajax({
    url: `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${newsName}&api-key=${appKey}`,
    method: "GET",
    success: function (data) {
      $.each(data.response.docs, function (key, value) {
        let html = `
        <div class="row row-1">
                        <div class="col-lg-5 col-md-5 col-sm-12  px-0">
                            <a href = ${value.web_url}>
                                <img src="https://static01.nyt.com/${value.multimedia[0].url}" alt="${value.snippet}" class="img-fluid" />
                            </a>
                        </div>
                        <div class="col-lg-7 col-md-7 col-sm-12 d-flex justify-content-center flex-column px-0 br-right">
                            <div class="news-builder-content p-4">
                                <h3>${value.headline.main}</h3>
                                <h4>${value.snippet}</h4>
                                <h4>${value.source}</h4>
                                <span>${value.pub_date}</span>
                                <p>${value.lead_paragraph}</p>
                                <a href=${value.web_url} class="btn btn-primary btn-builder-news">Read More</a>
                                <a class = "btn btn-builder-news btn-tweet"
                                target = "_blank"
                                href = "https://twitter.com/intent/tweet?text=${value.web_url}"
                                rel = "nooperner noreferrer"> Tweet <i class = "fab fa-twitter"> </i></a >
                                    </div>
                        </div>
</div>
`;
        $("#news").append(html);
      });
    },
    error: function (error) {
      console.log(error);
    },
  });
});