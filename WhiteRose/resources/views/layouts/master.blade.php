<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Favico -->
    <link rel="shortcut icon" href="{{ asset('/public/favicon.ico') }}" type="image/x-icon">
    <link rel="icon" href="{{ asset('/public/favicon.ico') }}" type="image/x-icon">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
     <meta name="csrf-token" content="{!! csrf_token() !!}">

    <meta property="og:url"           content="https://www.your-domain.com/your-page.html" />
      <meta property="og:type"          content="website" />
      <meta property="og:title"         content="whiterose" />
      <meta property="og:description"   content="Your description" />
      <meta property="og:image"         content="https://www.your-domain.com/path/image.jpg" />

    <title>WhiteRose</title>
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
@yield('styles')
</head>

<body>

    <div id="app_holder">
        @include('layouts.header')
        @yield('content')
        @include('layouts.footer')
    </div>

    <script src="{{ asset('js/app.js') }}"> </script>
</script>


</body>

</html>

