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

    <div id="home" class="container-fluid" :role="role">
        <router-view></router-view>
    </div>
    <script src="{{ asset('js/app.js') }}"> </script>

</body>

</html>

