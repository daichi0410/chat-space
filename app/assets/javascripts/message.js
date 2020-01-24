$(function(){

  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.message:last').data("message-id");
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
      if (messages.length !== 0) {
      //追加するHTMLの入れ物を作る
      var insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      //メッセージが入ったHTMLに、入れ物ごと追加
      $('.chat-main__message').append(insertHTML);
      $('.chat-main__message').animate({ scrollTop: $('.chat-main__message')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };

    var buildHTML = function(message) {
     if ( message.content && message.image) {
       var html =
        `<div class = "chat-main__message__list message" data-message-id=${message.id}>
          <div class = "chat-main__message__list__namebox1">
            <div class = "chat-main__message__list__namebox1__name1">
              ${message.user_name} 
            </div>
            <div class= "chat-main__message__list__namebox1__date1">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-main__message__list__comments1">
            <p class="chat-main__message__list__comments1__content">
              ${message.content}
            </p>
            <img src="${message.image}" class="chat-main__message__list__comments1__image">
          </div>
        </div>`
    } else if (message.content) {
      var html = 
        `<div class="chat-main__message__list message" data-message-id=${message.id}>
          <div class="chat-main__message__list__namebox1">
            <div class="chat-main__message__list__namebox1__name1">
              ${message.user_name}
            </div>
            <div class="chat-main__message__list__namebox1__date1">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-main__message__list__comments1">
            <p class="chat-main__message__list__comments1__content">
              ${message.content}
            </p>
          </div>
        </div>`
    } else if (message.image) {
      var html =
        `<div class = "chat-main__message__list message" data-message-id=${message.id}>
          <div class="chat-main__message__list__namebox1">
            <div class = "chat-main__message__list__namebox1__name1">
              ${message.user_name}
            </div>
            <div class="chat-main__message__list__namebox1__date1">
              ${message.created_at}
            </div>
          </div>
          <div class = "chat-main__message__list__comments1">
            <img src="${message.image}" class="chat-main__message__list__comments1__image" >
          </div>
        </div>`
    };
    return html;
  };

$('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__message').append(html);      
      $('.chat-main__message').animate({ scrollTop: $('.chat-main__message')[0].scrollHeight});
    })
    .fail(function () {
      alert('メッセージ送信に失敗しました。');
    })
    .always(function(){
      $(".chat-main__message-form__send").prop('disabled', false);
      $('form')[0].reset();
    });
})
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});
