$(function () {
    var $title= $('#title');
    var $movie_ls= $('#movie-list');
    var $moviedetails= $('#movie-details')
    $('#search-button').on('click', function() {
        $moviedetails.empty();
        $.ajax({
          type : 'GET',
          url : 'http://www.omdbapi.com/?s=title',
          success : function (data) {
            var allTitles = data.Search;
            console.log(allTitles);
            $movie_ls.empty();
            $movie_ls.append("<tr><td><strong>Movie List</strong></td><td><strong>IMDB ID</strong></td><td><strong>More Info</strong></td></tr>");
            $.each(allTitles,function (i,T) {
              var title = $title.val();
              if (T.Title.toLowerCase().includes(title.toLowerCase())) {
                $movie_ls.append("<tr><td>"+T.Title+"</td><td>"+T.imdbID+"</td><td><button type='button' id='info-button'>More Info</button></td></tr>");
              // console.log(T.Title);
              }
              // else {
              // // $movie_ls.empty();
              //   $movie_ls.append("<p><strong>No results found !!</strong></p>");
              // }
            //  console.log(movie_ls);
            })
          }
        });
    });

    $movie_ls.delegate('#info-button', 'click', function(){
      $moviedetails.empty();
      var id = $(this).closest('td').prev('td').text();
      //alert(clk);
      $.ajax({
        type : 'GET',
        url : 'http://www.omdbapi.com/?s=title',
        success : function (data) {
          $moviedetails.empty();
            var allMovies = data.Search;
            $.each(allMovies,function (i,T) {
              if (T.imdbID === id) {
                //$movie_ls.append("<tr><td>"+T.Title+"</td><td><button type='button' id='info-button'>More Info</button></td></tr>");
                console.log(T.Title);
                $moviedetails.append("<li><img src='"+T.Poster+"'></li>");
                $moviedetails.append("Title : <li>"+T.Title+"</li>");
                $moviedetails.append("Year : <li>"+T.Year+"</li>");
                $moviedetails.append("IMDB : <li><a href='http://www.imdb.com/"+T.imdbID+"'>More Details</a></li>");
              // console.log(T.Title);
              }
            //  console.log(movie_ls);
            })
        }
      });

    });

});
