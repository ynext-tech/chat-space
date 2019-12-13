$(function(){
  function buildHTML(message){
    if (message.image) {
      var html = ` <div class="message">
                    <div class="upper-message">
                      <div class="upper-message__user-name"> ${message.user_name} </div>
                      <div class="upper-message__date"> ${message.date} </div>
                    </div>
                    <div class="lower-message">
                     <div class="lower-message__content"> ${message.content} </div>
                     <img src=" ${message.image}" class=lower-message__image>
                    </div>
                  </div>`
    } 
    else {
      var html = ` <div class="message">
                    <div class="upper-message">
                      <div class="upper-message__user-name"> ${message.user_name} </div>
                      <div class="upper-message__date"> ${message.date} </div>
                    </div>
                    <div class="lower-message">
                     <div class="lower-message__content"> ${message.content} </div>
                    </div>
                  </div>`
    }
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('.new_message')[0].reset();
      $('.form__submit').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
  });
  })
});