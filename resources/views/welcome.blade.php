<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>📝 Todo</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="icon" type="image/png" href="images/favicon.png">
        <link rel="stylesheet" type="text/css" href="{{ mix('css/app.css') }}">
        <style>
            body {
                -webkit-font-smoothing: antialiased;
            }
        </style>
    </head>

    <body class="" >
        <div id="app" v-cloak>
            <router-view></router-view>
            @yield('content')
        </div>
    </body>
    <script src="{{ mix('js/vendor.js') }}"></script>
    <script src="{{ mix('js/manifest.js') }}"></script>
    <script src="{{ mix('js/app.js') }}"></script>
</html>
