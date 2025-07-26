function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.search);
  if (results == null) {
    return "";
  }
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
};

function getAspxRadioButtonNameForJQuery(ClientID, NamingContainer_ID, UniqueID, GroupName)
{

  var rb_name;
  rb_name = ClientID.replace(NamingContainer_ID + '_', '');
  rb_name = UniqueID.replace(rb_name, GroupName);

  return rb_name;
};


var CollectError = function (Name, Message, OwnerTypeID, OwnerID) {
  try {
    $.ajax({
      url: "/FotoUpload/Default.aspx/CollectError",
      type: 'POST',
      data: '{"Name" : ' + JSON.stringify(Name) + ',"Message" : ' + JSON.stringify(Message) + ',"OwnerTypeID" : "' + OwnerTypeID + '","OwnerID" : "' + OwnerID + '"}',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      success: function (data, textStatus, jqXHR) {
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.responseText);
      }
    });
  }
  catch (err) {
  }
}