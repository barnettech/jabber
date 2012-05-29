if (Drupal.jsEnabled) {
    $(document)
            .ready(function() {
              // alert('hi there');
              // $( "#dialog" ).dialog();
              $(function() {
                $( "#accordion" ).accordion({ clearStyle: true, active: false, collapsible: true });
              });
              var url = '/jabber/get-chat-history';
              $.post(url, {},
            		    function(data){
            	          var obj = $.evalJSON(data);
            			  var theJids = obj.open_jids;
            			  // Just gets rid of the last extra comma.
            			  theJids = theJids.slice(0, -1)
            			  var mySplitResult = theJids.split(",");
            			  for(i = 0; i < mySplitResult.length; i++){
            				jid_id = mySplitResult[i];
            				jid = mySplitResult[i];
            				jid_id = jid_id.replace('@', '-');
            				jid_id = jid_id.replace('\.', '-');
                    jid_id = jid_id.replace(/\/.*/,'');
            				jid = $('#'+jid_id).find('.roster-name').text();
                    if (!jid) { jid = mySplitResult[i];}

                    if($('#chat-' + jid_id).length == 0) {
            				  $('#chat-area').tabs('add', '#chat-' + jid_id, jid + '  <a href="" class="close-tab">x</a>');
                      $('#chat-' + jid_id).append(
                    "<div class='chat-messages'></div>" +
                    "<input type='text' class='chat-input'>");

                    }
            				$('#chat-' + jid_id + ' .chat-messages').append(obj[jid_id]);
                    // Gab.scroll_chat(jid_id);
            			  }
            		      });
              $(".close-tab").live("click", function(ev) {
            	 ev.preventDefault();
            	 var theId = $(this).prev('a').attr('href'); 
            	 $(theId).remove();
            	 $(this).closest('li').remove();
            	 var conv_partner_jid = $(this).siblings().attr('href');
            	 conv_partner_jid = conv_partner_jid.replace('#chat-','');
            	 conv_partner_jid = conv_partner_jid.replace('-','@');
            	 conv_partner_jid = conv_partner_jid.replace('-','.');
            	 var url = '../jabber/post-chat-history'
                     $.post(url, {conv_partner_jid: conv_partner_jid, close_window: 'yes'},
                         function(data){
                     	  
                           });
              });
              $('#away').live("click", function() {
            	  // Gab.connection.send($pres().c('show').t("away").up().c('status').t("-reconnecting"));
            	  Gab.connection.send($pres().c('show').t("away").up().c('status').t("setting presence"));
              });
              $('#present').live("click", function() {
            	  // Gab.connection.send($pres().c('show').t("away").up().c('status').t("-reconnecting"));
            	  Gab.connection.send($pres());
              });
              $(document).bind('markpresence', function (event, param1, param2) {
            	  var selector2 = "." + param2;
            	if($(selector2)[0]) {
            	  var thetext = '';
            	  thetext = $(selector2 + ':first').text();
            	  var myClasses = $('.' + param2).attr("class");
            	  var myRegExp = /online/;
            	  var matchPos1 = myClasses.search(myRegExp);
            	  //if(matchPos1 != -1) {
            	  if(param1 == 'away') {
            	    myClasses = myClasses.replace("online", "away");
            	    myClasses = myClasses.replace("offline", "away");
            	    $(selector2).replaceWith('<div class="' + myClasses + '">' + thetext + '</div>');
            	  }
            	  if(param1 == 'online') {
            		myClasses = myClasses.replace("offline", "online");
            		myClasses = myClasses.replace("away", "online");
              	    $(selector2).replaceWith('<div class="' + myClasses + '">' + thetext + '</div>');
            	  }
            	  if(param1 == 'offline') {
              		myClasses = myClasses.replace("online", "offline");
              		myClasses = myClasses.replace("away", "offline");
                	$(selector2).replaceWith('<div class="' + myClasses + '">' + thetext + '</div>');
              	  }
            	}
              });
            });
    
    
    function Set_Cookie( name, value, expires, path, domain, secure )
    {
    // set time, it's in milliseconds
    var today = new Date();
    today.setTime( today.getTime() );

    /*
    if the expires variable is set, make the correct
    expires time, the current script below will set
    it for x number of days, to make it for hours,
    delete * 24, for minutes, delete * 60 * 24
    */
    if ( expires )
    {
    expires = expires * 1000 * 60 * 60 * 24;
    }
    var expires_date = new Date( today.getTime() + (expires) );

    document.cookie = name + "=" +escape( value ) +
    ( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) +
    ( ( path ) ? ";path=" + path : "" ) +
    ( ( domain ) ? ";domain=" + domain : "" ) +
    ( ( secure ) ? ";secure" : "" );
    }
};
