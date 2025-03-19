    $(document).ready(function() {
      // Set default target date to one week from now
      const defaultDate = new Date();
      defaultDate.setDate(defaultDate.getDate() + 7);
      
      // Format for input datetime-local
      const year = defaultDate.getFullYear();
      const month = String(defaultDate.getMonth() + 1).padStart(2, '0');
      const day = String(defaultDate.getDate()).padStart(2, '0');
      const hours = String(defaultDate.getHours()).padStart(2, '0');
      const minutes = String(defaultDate.getMinutes()).padStart(2, '0');
      
      const defaultDateString = `${year}-${month}-${day}T${hours}:${minutes}`;
      $('#datetime-picker').val(defaultDateString);
      
      // Set initial countdown
      let targetDate = new Date(defaultDateString);
      updateTargetDateDisplay(targetDate);
      
      // Update countdown every second
      let countdownInterval = setInterval(() => updateCountdown(targetDate), 1000);
      updateCountdown(targetDate);
      
      // Set new countdown target date
      $('#set-timer').on('click', function() {
        const newDateValue = $('#datetime-picker').val();
        if (newDateValue) {
          targetDate = new Date(newDateValue);
          updateTargetDateDisplay(targetDate);
          
          // Clear previous interval and start a new one
          clearInterval(countdownInterval);
          countdownInterval = setInterval(() => updateCountdown(targetDate), 1000);
          updateCountdown(targetDate);
          
          // Hide expired message if it was showing
          $('#expired-message').hide();
          $('.countdown-timer').show();
        }
      });
      
      function updateCountdown(targetDate) {
        const currentTime = new Date();
        const difference = targetDate - currentTime;
        
        if (difference <= 0) {
          // Countdown expired
          $('#days').text('00');
          $('#hours').text('00');
          $('#minutes').text('00');
          $('#seconds').text('00');
          $('#expired-message').show();
          $('.countdown-timer').hide();
          return;
        }
        
        // Calculate time components
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        // Update DOM with jQuery
        $('#days').text(String(days).padStart(2, '0'));
        $('#hours').text(String(hours).padStart(2, '0'));
        $('#minutes').text(String(minutes).padStart(2, '0'));
        $('#seconds').text(String(seconds).padStart(2, '0'));
      }
      
      function updateTargetDateDisplay(date) {
        const options = { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        };
        $('#target-date').text('Countdown to: ' + date.toLocaleDateString(undefined, options));
      }
    });