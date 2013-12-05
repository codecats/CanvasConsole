<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" href="./assets/style/Css/Console.css">
        <title>Canvas Console</title>
        <style>

        </style>
    </head>
    <body>
    <div class="console">
        <div id="container"></div>
        <script src="assets/script/Js/bug.js"></script>
        <!-- LIBS -->
        <script src="./assets/script/Js/Lib/kinetic-v4.5.1.min.js"></script>
        <script src="./assets/script/Js/Lib/three.min.js"></script>
        <!-- CLASSES -->
        <!-- helpers -->
        <script src="assets/script/Js/Class/Helpers/Base64.js"></script>
        <script src="assets/script/Js/Class/Helpers/Convert.class.js"></script>
        <!-- >helpers -->
   
        
        <!-- system -->
        <script src="assets/script/Js/Class/CanvasConsole/Lib/Core.js"></script>
        <script src="assets/script/Js/Class/CanvasConsole/Lib/Node.js"></script>
        <!-- VisualizationNode completly independent of other objects: require strz_console.Node-->
        <script src="assets/script/Js/Class/CanvasConsole/Class/Visualization/VisualizationNode.class.js"></script>
        <!-- >VisualizationNode -->
        <!-- >system -->
        
        <!-- Console - makes orders -->
        <script src="assets/script/Js/Class/CanvasConsole/Class/Console/ConsoleText.class.js"></script>
        <script src="assets/script/Js/Class/CanvasConsole/Class/Console/ConsoleOrder.class.js"></script>
        <script src="assets/script/Js/Class/CanvasConsole/Class/Console/ConsoleModel.class.js"></script>
        <script src="assets/script/Js/Class/CanvasConsole/Class/Console/Console.class.js"></script>
        <!-- >Console -->
        
        <!-- Visualization Controller - all visualizations switcher -->
        <script src="assets/script/Js/Class/CanvasConsole/Class/ControllerVis/VisualizationContainer.class.js"></script>
        <script src="assets/script/Js/Class/CanvasConsole/Class/ControllerVis/VisualizationController.class.js"></script>
        <!-- >Visualization Controller -->

        <!-- Canvas Controller - controls console, visualizationController, listen orders for them -->
        <script src="assets/script/Js/Class/CanvasConsole/Class/CanvasController.class.js"></script>
        <!-- >Canvas Controller -->
        
        <!-- Animations -->
        <script src="assets/script/Js/Class/Visualization/Code.class.js"></script>
        <script src="assets/script/Js/Class/Visualization/Math/Math.class.js"></script>
        <script src="assets/script/Js/Class/Visualization/Label.class.js"></script>
         <!-- >Animations -->
        
        <!-- ACTION -->
        <!-- main -->
        <script src="./assets/script/Js/Main.js"></script>
        <!-- >main -->
    </div>
        
 <!-- avalible to put command in the console line to play music. notice
        that Poison.mp3 file is not avalible in the resource.
    <audio  controls >
        <source src="./Poison.mp3" type="audio/mpeg">
        <source src="./Poison.ogg" type="audio/ogg">
        <embed height="50" width="100" src="horse.mp3">
    </audio> -->
    </body>
</html>