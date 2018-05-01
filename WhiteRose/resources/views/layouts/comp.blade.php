<html>
  <header></header>
  <body>
    <div id="app">
      @if (isset($component))
        <component :is={{ $component }}>
      @endif

         @yield('content')

     @if (isset($component))
       </component>
     @endif
    </div>
  </body>
</html>