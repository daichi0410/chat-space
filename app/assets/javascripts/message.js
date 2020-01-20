$(function(){
    function buildHTML(message){
     if ( message.image ) {
       var html =
        `<div class = "chat-main__message-list" data-message-id=${message.id}>
           <div class="chat-main__message-list__namebox1">
             <div class = "chat-main__message-list__namebox1__name1">
               ${message.user_name}
             </div>
             <div class= "chat-main__message-list__namebox1__date1">
               ${message.created_at}
             </div>
           </div>
           <div class="chat-main__message-list__comments1">
             <p class="chat-main__message-list__comments1__content">
               ${message.content}
             </p>
             <img src= ${message.image} class='chat-main__message-list__comments1__image'>
           </div>
        </div>`
      return html;
    } else {
      var html = 
        `<div class="chat-main__message-list" data-message-id=${message.id}>
          <div class="chat-main__message-list__namebox1">
            <div class="chat-main__message-list__namebox1__name1">
              ${message.user_name}
            </div>
            <div class="chat-main__message-list__namebox1__date1">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-main__message-list__comments1">
            <p class="chat-main__message-list__comments1__content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  }

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
      $('.chat-main__message-list_add').append(html);      
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
    })
    .fail(function () {
      alert('メッセージ送信に失敗しました。');
    })
    .always(function(){
      $(".chat-main__message-form__send").prop('disabled', false);
      $('form')[0].reset();
    });
})
});
