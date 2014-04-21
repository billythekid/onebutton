<?php
  $game = (empty($_GET['game'])) ? "tux" : $_GET['game'];
  switch($game)
  {
    case "heli":
      $gameTitle = "Helicopter";
      $gameJS = array("heli/Bullet.js","tux/badguy.js","heli/sea.js","heli/Heli.js","heli/onebutton.js");
      $rules = "Shoot bad icons for 100 points<br/>Bad guys who escape -1000 points<br/>Bullets cost 50 points<br/>Shoot Tux -10000</br>Let Tux escape +10000<br/>Don't crash into ceiling or sea.";
      break;
    default:
      $gameTitle = "Tux in space";
      $gameJS = array("tux/stars.js","tux/badguy.js","tux/onebutton.js");
      $rules = "Help Tux miss bad icons.<br/>The longer you survive the faster it gets and the more points you score<br/>Don't crash into icons, ceiling or floor";
  }
?>
<!DOCTYPE html>
<html>
  <head>
    <title>One button challenge - <?= $gameTitle ?></title>
<?php foreach($gameJS as $js){?>
    <script src="<?= $js ?>" type="text/javascript"></script>
<?php } ?>
    <style type="text/css">
      div    { float:left; border:1px solid black;border-radius: 5px; margin:2px; padding:2px;}
      canvas { margin:2px; border: 1px solid black;border-radius: 5px;}
      button { width:600px;height:4em;}
      #refresh      { float:left;clear:both;}
      * {font-family:arial,sans-serif;}
    </style>
  </head>
  <body onload="init();">
    <div>
      <canvas id="canvas" width="600px" height="600px">Really?</canvas>
      <br/>
      <button id="onebutton" onmousedown="buttonDown()" onmouseup="buttonUp()" ontouchstart="buttonDown()" ontouchend="buttonUp()" >ONE BUTTON</button>
    </div>
    <div id="menu">
      <h3>Other one button HTML5 canvas games</h3>
      <ul>
        <li><a href="?game=tux">Tux in space</a></li>
        <li><a href='?game=heli'>Helicopter</a></li>
      </ul>
    </div>
    <div id="rules">
      <h3>Rules</h3>
      <?=$rules?>
    </div>
    <a href="#" id="refresh" onclick="location.reload(true);return false;">Refresh</a>
  </body>
</html>
