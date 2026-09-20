(function(){
    var toggle = document.getElementById('navToggle');
    var panel = document.getElementById('mobilePanel');
    if(toggle && panel){
      toggle.addEventListener('click', function(){
        var open = panel.classList.toggle('open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        toggle.textContent = open ? '✕' : '☰';
      });
      panel.querySelectorAll('a').forEach(function(link){
        link.addEventListener('click', function(){
          panel.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
          toggle.textContent = '☰';
        });
      });
    }

    var copyBtn = document.getElementById('copyEmailBtn');
    var copyFeedback = document.getElementById('copyFeedback');
    if(copyBtn){
      copyBtn.addEventListener('click', function(){
        var email = copyBtn.getAttribute('data-email');
        function showCopied(){
          copyFeedback.textContent = 'Adresse copiée ✓';
          setTimeout(function(){ copyFeedback.textContent = ''; }, 2500);
        }
        function showFailed(){
          copyFeedback.textContent = "Impossible de copier automatiquement — sélectionnez l'adresse manuellement.";
        }
        if(navigator.clipboard && navigator.clipboard.writeText){
          navigator.clipboard.writeText(email).then(showCopied, showFailed);
        } else {
          try{
            var temp = document.createElement('textarea');
            temp.value = email;
            temp.style.position = 'fixed';
            temp.style.opacity = '0';
            document.body.appendChild(temp);
            temp.focus();
            temp.select();
            document.execCommand('copy');
            document.body.removeChild(temp);
            showCopied();
          } catch(err){
            showFailed();
          }
        }
      });
    }

  })();
