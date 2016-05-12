var peer = new Peer({
  key: 'r7jd35v5u9fcg14i',
  debug: 3,
  logFunction() {
    var copy = Array.prototype.slice.call(arguments).join(' ');
    console.log(copy);
  }
});

var connectedPeers = {};

peer.on('open', function(id){
  console.log('My peer ID is: ' + id);
});

peer.on('connection', connect);

peer.on('error', function(err) {
  console.log(err);
});

connect(c) {
  c.on('data', function(data) {
    console.log(data);
  });
  c.on('close', function() {
    alert(c.peer + ' has left the chat.');
    delete connectedPeers[c.peer];
  });   
  connectedPeers[c.peer] = 1;
};

$(document).ready(function() {
  $('#connect').click(function() {
    var requestedPeer = $('#rid').val();
    if (!connectedPeers[requestedPeer]) {
      var c = peer.connect(requestedPeer, {
        label: 'chat',
        serialization: 'none',
        metadata: {message: 'hi i want to chat with you!'}
      });
      c.on('open', function() {
        connect(c);
      });
      c.on('error', function(err) { alert(err); });
    }
    connectedPeers[requestedPeer] = 1;
  });

  $('#close').click(function() {
    eachActiveConnection(function(c) {
      c.close();
    });
  });

  $('#send').submit(function(e) {
    e.preventDefault();
    // For each active connection, send the message.
    var msg = $('#text').val();
    eachActiveConnection(function(c, $c) {
      if (c.label === 'chat') {
        c.send(msg);
        $c.find('.messages').append('<div><span class="you">You: </span>' + msg
          + '</div>');
      }
    });
    $('#text').val('');
    $('#text').focus();
  });

  eachActiveConnection(fn) {
    var actives = $('.active');
    var checkedIds = {};
    actives.each(function() {
      var peerId = $(this).attr('id');
      if (!checkedIds[peerId]) {
        var conns = peer.connections[peerId];
        for (var i = 0, ii = conns.length; i < ii; i += 1) {
          var conn = conns[i];
          fn(conn, $(this));
        }
      }
      checkedIds[peerId] = 1;
    });
  }
});

window.onunload = window.onbeforeunload = function(e) {
  if (!!peer && !peer.destroyed) {
    peer.destroy();
  }
};