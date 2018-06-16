<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{!! csrf_token() !!}">

    <meta property="og:type"          content="website" />
    <meta property="og:title"         content="whiterose" />
    <meta property="og:description"   content="Your description" />
    <title>WhiteRose</title>
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>

<body>

    <div id="lander" >
        
        <transition-group name="setup">

            <matrix 
            key="matrix"
            v-if="show_matrix"
            ></matrix>

            <router-view
            key="main"
            v-if="!show_matrix"
            ></router-view>     

        </transition-group>
    </div>
    <script src="{{ asset('js/app.js') }}"> </script>

</body>

</html>

