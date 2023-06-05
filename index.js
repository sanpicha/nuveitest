  var dropdownToggle = document.querySelectorAll('.dropdown-toggle');

    dropdownToggle.forEach(function(element) {
      element.addEventListener('click', function(e) {
        e.preventDefault();
        var dropdown = this.parentNode;
        dropdown.classList.toggle('active');
      });
    });