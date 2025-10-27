document.addEventListener('DOMContentLoaded', () => {
  const dateTimeBlock = document.getElementById('dateTimeBlock');

  function updateDateTime() {
    const now = new Date();

    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const day = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const formatted = `${day} ${month} ${year} ${hours}:${minutes}:${seconds}`;
    dateTimeBlock.textContent = formatted;
  }

  updateDateTime();
  setInterval(updateDateTime, 1000);
});

$(document).ready(function() {
    const $teamSearchInput = $('#teamSearch');
    const $teamMembers = $('#team .row.g-4').find('> div[class*="col-"]');
    const $teamSuggestionsContainer = $('#teamSuggestions');
    
    let teamNames = [];
    
    $teamMembers.each(function() {
        const nameAndRole = $(this).find('h3').text().trim(); 
        if (nameAndRole) {
            teamNames.push(nameAndRole);
        }
    });

    $teamSearchInput.on('keyup', function() {
        const searchText = $(this).val().toLowerCase().trim();
        $teamSuggestionsContainer.empty(); 

        if (searchText.length > 0) {
            const suggestions = teamNames.filter(name => 
                name.toLowerCase().includes(searchText)
            );
           
            suggestions.slice(0, 5).forEach(name => {
                const $suggestionItem = $('<a>')
                    .attr('href', '#')
                    .addClass('list-group-item list-group-item-action')
                    .text(name)
                    .on('click', function(e) {
                        e.preventDefault();
                        $teamSearchInput.val(name); 
                        $teamSuggestionsContainer.empty(); 
                        $teamSearchInput.trigger('keyup');
                        $teamSearchInput.focus(); 
                    });
                $teamSuggestionsContainer.append($suggestionItem);
            });

            if (suggestions.length > 0) {
                $teamSuggestionsContainer.show();
            } else {
                $teamSuggestionsContainer.hide();
            }
        } else {
            $teamSuggestionsContainer.hide();
        }

    });

    $(document).on('click', function(e) {
        if (!$(e.target).closest('#teamSearch, #teamSuggestions').length) {
            $teamSuggestionsContainer.hide();
        }
    });

    $teamSearchInput.on('keyup', function() {
        const searchText = $(this).val().toLowerCase().trim();
        const $teamSection = $('#team');

        $teamSection.find('span.highlight').contents().unwrap();

        $teamMembers.each(function() {
            const $member = $(this);
            const memberText = $member.find('article').text().toLowerCase();

            if (memberText.includes(searchText)) {
                $member.show();
          
                if (searchText.length > 0) {
                     const $textColumns = $member.find('.col-7, .col-md-8'); 
                     const regex = new RegExp(escapeRegExp(searchText), 'gi'); 
                    
                     $textColumns.each(function() {
                        let html = $(this).html();
                        html = html.replace(regex, '<span class="highlight">$&</span>');
                        $(this).html(html);
                    });
                }
            } else {
                $member.hide();
            }
        });
    });

    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    
});

$(document).ready(function() {
    const $counter = $('#projectsCount');
    if ($counter.length) {
        let hasAnimated = false; 

        function isElementInViewport($el) {
            const rect = $el[0].getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }

        function startCounter() {
            if (hasAnimated) return;

            const target = parseInt($counter.data('target'));
   
            $({ count: 0 }).animate({ count: target }, {
                duration: 2000,
                easing: 'swing',
                step: function() {
                    $counter.text(Math.ceil(this.count));
                },
                complete: function() {
                    $counter.text(target);
                    hasAnimated = true;
                }
            });
        }

        $(window).on('scroll load', function() {
            if (isElementInViewport($counter)) {
                startCounter();
            }
        });
        
        if (isElementInViewport($counter)) {
            startCounter();
        }
    }
});

$(document).ready(function(){
  $(".copy-btn").on("click", function(){
    let textToCopy = $(this).data("copy");
    let button = $(this);

    navigator.clipboard.writeText(textToCopy).then(function(){
      button.text("✅");
      button.attr("title", "Copied to clipboard!").tooltip({trigger:"manual"}).tooltip("show");
      setTimeout(function(){
        button.text("📋");
        button.tooltip("hide").attr("title", "Copy");
      }, 1500);
    });
  });
});

$(document).ready(function(){
  function lazyLoad() {
    $(".lazy").each(function(){
      let img = $(this);
      if (img.attr("data-src") && isInViewport(img)) {
        img.attr("src", img.data("src"));
        img.removeAttr("data-src");
      }
    });
  }

  function isInViewport(element) {
    let elementTop = element.offset().top;
    let elementBottom = elementTop + element.height();
    let viewportTop = $(window).scrollTop();
    let viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
  }

  $(window).on("scroll resize", lazyLoad);
  lazyLoad();
});
