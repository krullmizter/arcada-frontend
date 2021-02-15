$(document).ready(function () {

  // Toggle HackerVPN 
  $("#closeHacker").click(function(){
    $("#hacker").toggle("fold");

    $("#closeHacker").toggleClass("flipIcon");
  });

  // -- Uppgift 1 - Animationer

  $(".toggle").click(function(){
    $("#imgEffect").toggle("clip", {times: 3}, "slow");
  });

  $(".explode").click(function(){
    $("#imgEffect").toggle("explode");
  });

  $('.wow').click(function() {
    $("#imgEffect").animate({height: '25rem', opacity: '0.75'}, "fast");
  });

  $('.gsapEx').click(function(){
    gsap.to("#imgEffect", {duration: 3, x: 150, y: -120, rotation: 180, scale: 1.2, ease: 'elastic'});
  });

  $("#opacity").change(function(){
    let domOpac = $("#opacity").val();
    $("#imgEffect").css({opacity: domOpac});
  });

  // -- Uppgift 2 - ​HTML5 och jQuery UI --

  // Background color
  $("#range-wrapper").change(function() {
    let rangeRed   = document.getElementById("rangeRed").value;
    let rangeGreen = document.getElementById("rangeGreen").value;
    let rangeBlue  = document.getElementById("rangeBlue").value;
    let rangeRGB   = (rangeRed + ',' + rangeGreen + ',' + rangeBlue);
    let rangeBG    = 'rgb(' + rangeRGB + ')'; 

    $('body').css('background-color', rangeBG);
    $('#rangeRGB').html(rangeRGB);
    $('#rangeHEX').html(rangeHEX);
  });

  // Autocomplete
  $.widget( "custom.autocomplete", $.ui.autocomplete, {
    _create: function() {
      this._super();
      this.widget().menu( "option", "items", "> :not(.ui-autocomplete-category)" );
    },
    _renderMenu: function( ul, items ) {
      var that = this,
      currentCategory = "";
      $.each( items, function( index, item ) {
        var li;
        if ( item.category != currentCategory ) {
          ul.append( "<li class='ui-autocomplete-category'>" + item.category + "</li>" );
          currentCategory = item.category;
        }
        li = that._renderItemData( ul, item );
        if ( item.category ) {
          li.attr( "aria-label", item.category + " : " + item.label );
        }
      });
    }
  });

  const TAGS = [
    {label: "Coffee", category: "Bad" },
    {label: "Te", category: "bad" },
    {label: "Battery", category: "Okay" },
    {label: "Rockstar", category: "Okay" },
    {label: "Monster", category: "Legendary" },
    {label: "RedBull", category: "Legendary" },
    {label: "Coding", category: "Legendary" }
  ];

  $("#autocomplete").autocomplete( {
    source: TAGS
  });
  
  // -- Uppgift 3 - Cookies & Localstorage -- // 
  function setCookie(cname, cvalue, exdays) {
    var date = new Date();
    date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + date.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');

    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];

      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  $('#logout').hide(); // Defualt logout hiden
  
  $('#login').click(function checkCookie() {
    var user = getCookie("username");
    
    if (user != "") { // If the user is found, load the script
      userSession();

    } else {
      user = prompt("Please enter your name:", "");

      if (user != "" && user != null) {
        setCookie("username", user, 7);

        userSession();
      }
    }
  });

  function userSession() { // The changes after login & logout click
    var user = getCookie("username");

    $('#login').hide();
    $('#logout').show();
    $('#accountInfo').show();

    $('#accountName').html('Welcome ' + user + '!'); 
    $('#visits').html('<p>' + 'You\'ve visited this page ' + localStorage['counter'] + ' times.' + '</p>');

    $('#logout').click(function() { // After login you click the logout remove the info and switch the login to display
      $('#login').show();
      $('#logout').hide();
      $('#accountInfo').hide();
    });
  }

  // Localstorage
  $(window).ready(function() {
    if ('localStorage' in window && window['localStorage'] !== null) {
      ('counter' in localStorage && localStorage['counter'] !== null) ? localStorage['counter']++ : localStorage['counter'] = 1;
    }
  });

  // -- Uppgift 4 - AJAX -- // 

  $("#secret").click(function(){
      $("#ajax-heading").load("../ajax.html");
  });

  // -- Uppgift 5 - JSON -- //

  //IP Lookup
  $.ajax({
    dataType: "json",
    url: "https://api.ipify.org?format=jsonp&callback=?",
    success: function(json) {
      $('#ip').html("Your IP is compromised: " + json.ip);
    }
  });

  // OpenWeather

  const LOCATIONTAGS = [
    {label: "Copenhagen", category: "Scandinavia" },
    {label: "Helsinki", category: "Scandinavia" },
    {label: "Oslo", category: "Scandinavia" },
    {label: "Reykjavik", category: "Scandinavia" },
    {label: "Copenhagen", category: "Scandinavia" }
  ];

  $("#location").autocomplete( {
    source: LOCATIONTAGS
  });


  $('#location').on('change', function() {
    let location = $('#location').val();
    let completeData = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=metric";

    //https://api.openweathermap.org/data/2.5/weather?q=Helsinki&units=metric
    $('#lookup').click(function(){
      $.ajax({
        dataType: "json",
        url: completeData,
        data: {
          //'APPID': 'API',
        },
        success: function(weather) {
          $('#weather').html('The avg. temp is: ' + weather.main.temp + "&deg;");
        },
        error:function(error) {
          console.log(`${error}`);
        }
      });
    });
  });

  // -- Uppgift 6 - Charts -- //

  // Google Charts
  google.charts.load("current", {packages:["corechart"]});
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['Language', 'Speakers (in millions)'],
      ['Doing something', 13], ['Procrastinating', 43], ['StackOverflow', 24]
    ]);

    var options = {
      title: 'Time spent on this website',
      legend: 'none',
      pieSliceText: 'label',
      slices: {  4: {offset: 0.2},
                12: {offset: 0.3},
                14: {offset: 0.4},
                15: {offset: 0.5},
      },
    };

    var chart = new google.visualization.PieChart($("#google-charts")[0]);
    chart.draw(data, options);
  }

  // Highcharts
  var chart = Highcharts.chart('highcharts', {

    title: {
        text: 'Jul Feelis'
    },

    subtitle: {
        text: 'Hur mycket jul feelis har jag under ett år'
    },

    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },

    series: [{
        type: 'column',
        colorByPoint: true,
        data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 99],
        showInLegend: false
    }]

  });

  // Chart JS
  var ctx = document.getElementById('chart-js').getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
  });

  
  // -- Footer year --
  const YEAR = (new Date).getFullYear();
  $("#year").text(YEAR);

});