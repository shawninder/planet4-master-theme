const { __ } = wp.i18n;

export const setupCountrySelect = function($) {
  'use strict';

  $('.country-select-dropdown').click(function(){
    $(this).parent().toggleClass('active-li');
    $('.country-select-box').toggle();
  });

  $('.country-select-box .country-list li').click(function(){
    $(this).parents('.country-select-box').find('li').removeClass('active');
    $(this).addClass('active');
  });

  $('.country-selectbox').click(function(){
    $(this).toggleClass('active');
    $(this).parent().find('.option-contry').toggleClass('active');
  });

  // Get Countries List from <script> data block.
  let $countries_script = $('#countries_script');
  if ( $countries_script.length > 0 ) {
    let countries_json = JSON.parse($countries_script.text());

    // Build html for countries drop down list.
    let countries_html = $(
      '<div id="country-list" class="country-list">' +
      '<a class="international" href=""></a>' +
      '<ul class="countries_list" aria-label="' + __('Worldwide site list', 'planet4-master-theme') + '" role="list"></ul>' +
      '</div>'
    );

    $.each(countries_json, (index, element) => {
      if ('0' === index) {
        $('.international', countries_html)
          .attr('href', element[0].url)
          .attr('data-ga-category', 'Country Selector')
          .attr('data-ga-action', 'Greenpeace International')
          .attr('data-ga-label', 'n/a')
          .text(element[0].name);

      } else {
        let countries_sublist = $(
          '<li>' +
          '<h3 class="country-group-letter">' + index + '</h3>' +
          '<ul class="countries_sublist" aria-label="' + __('Sites starting with the letter .' + index + '.', 'planet4-master-theme') + '" role="list"></ul>' +
          '</li>'
        );
        $('.countries_list', countries_html).append(countries_sublist);

        $.each(element, (index, country) => {
          $.each(country.lang, (index, lang) => {
            $('.countries_sublist', countries_sublist).append(
              '<li>' +
                '<a ' +
                  'href="' + lang.url + '" ' +
                  'data-ga-category="Country Selector" ' +
                  'data-ga-action="' + country.name + ' | ' + lang.name + '" ' +
                  'data-ga-label="n/a">' +
                    country.name + ' | ' + lang.name +
                '</a>' +
              '</li>');
          });
        });
      }
    });

    $('#navbar-dropdown #country-select').append(countries_html);
  }
};
