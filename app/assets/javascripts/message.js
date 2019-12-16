$(function(){
  function buildHTML(message) {
    var content = message.content ? `${ message.content }` : "";
    var img  = message.image ? `<img class="lower-message__image" src="${ message.image }">` : "";
    var html = `<div class="message" data-message-id="${message.id}">
                  <div class="upper-message">
                    <p class="upper-message__user-name">
                      ${message.user_name}
                    </p>
                    <p class="upper-message__date">
                      ${message.date}
                    </p>
                  </div>
                    <div class="lower-message">
                      <p class="lower-message__content">
                          ${content}
                      </p>
                          ${img}
                    </div>
                </div>`
  return html;
  }

    var reloadMessages = function() {
      if (window.location.href.match(/\/groups\/\d+\/messages/)){
      //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
      last_message_id = $('.message:last').data('message-id')
      $.ajax({
        //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
        url: "api/messages",
        //ルーティングで設定した通りhttpメソッドをgetに指定
        type: 'get',
        dataType: 'json',
        //dataオプションでリクエストに値を含める
        data: {id: last_message_id}
      })
      .done(function(messages) {
        //追加するHTMLの入れ物を作る
        var insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)       
          //メッセージが入ったHTMLに、入れ物ごと追加
        $('.messages').append(insertHTML);      
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
      })
      .fail(function() {
        alert('error');
      });
    })
  }
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
    });
      setInterval(reloadMessages, 7000);
  });