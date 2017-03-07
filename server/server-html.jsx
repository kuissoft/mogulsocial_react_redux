import React from 'react';
import config from 'config';

let GA, FB;

if (process.env.NODE_ENV === 'production') {
    GA = config.get('google_analytics_id') ? `(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
      ga('create', '${config.get('google_analytics_id')}', 'auto');
      ga('send', 'pageview');` : null;

    FB = config.get('grant.facebook.key') ? `
      window.fbAsyncInit = function() {
        FB.init({
          appId      : '${config.get('grant.facebook.key')}',
          xfbml      : true,
          version    : 'v2.6'
        });
      };
      (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));
    ` : null;
}

export default function ServerHTML({ body, assets, locale, title, meta }) {
    let page_title = title;
    let js_plugins_path = "/static/plugins.js";
    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            {
                meta && meta.map(m => {
                    if (m.title) {
                        page_title = m.title;
                        return null;
                    }
                    if (m.canonical)
                        return <link key="canonical" rel="canonical" href={m.canonical} />;
                    if (m.name && m.content)
                        return <meta key={m.name} name={m.name} content={m.content} />;
                    if (m.property && m.content)
                        return <meta key={m.property} property={m.property} content={m.content} />;
                    if (m.name && m.content)
                        return <meta key={m.name} name={m.name} content={m.content} />;
                    return null;
                })
            }
            <link rel="manifest" href="/static/manifest.json" />
            <link rel="icon" type="image/x-icon" href="/favicon.ico" />
            <link rel="apple-touch-icon-precomposed" sizes="57x57" href="/images/favicons/apple-touch-icon-57x57.png" type="image/png" />
            <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/images/favicons/apple-touch-icon-114x114.png" type="image/png" />
            <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/images/favicons/apple-touch-icon-72x72.png" type="image/png" />
            <link rel="apple-touch-icon-precomposed" sizes="144x144" href="/images/favicons/apple-touch-icon-144x144.png" type="image/png" />
            <link rel="apple-touch-icon-precomposed" sizes="60x60" href="/images/favicons/apple-touch-icon-60x60.png" type="image/png" />
            <link rel="apple-touch-icon-precomposed" sizes="120x120" href="/images/favicons/apple-touch-icon-120x120.png" type="image/png" />
            <link rel="apple-touch-icon-precomposed" sizes="76x76" href="/images/favicons/apple-touch-icon-76x76.png" type="image/png" />
            <link rel="apple-touch-icon-precomposed" sizes="152x152" href="/images/favicons/apple-touch-icon-152x152.png" type="image/png" />
            <link rel="icon" type="image/png" href="/images/favicons/favicon-196x196.png" sizes="196x196" />
            <link rel="icon" type="image/png" href="/images/favicons/favicon-96x96.png" sizes="96x96" />
            <link rel="icon" type="image/png" href="/images/favicons/favicon-32x32.png" sizes="32x32" />
            <link rel="icon" type="image/png" href="/images/favicons/favicon-16x16.png" sizes="16x16" />
            <link rel="icon" type="image/png" href="/images/favicons/favicon-128.png" sizes="128x128" />
            <meta name="application-name" content="Steemit" />
            <meta name="msapplication-TileColor" content="#FFFFFF" />
            <meta name="msapplication-TileImage" content="/images/favicons/mstile-144x144.png" />
            <meta name="msapplication-square70x70logo" content="/images/favicons/mstile-70x70.png" />
            <meta name="msapplication-square150x150logo" content="/images/favicons/mstile-150x150.png" />
            <meta name="msapplication-wide310x150logo" content="/images/favicons/mstile-310x150.png" />
            <meta name="msapplication-square310x310logo" content="/images/favicons/mstile-310x310.png" />
            <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600" rel="stylesheet" type="text/css" />
            <link href="https://fonts.googleapis.com/css?family=Source+Serif+Pro:400,600" rel="stylesheet" type="text/css" />
            { assets.style.map((href, idx) =>
                <link href={href} key={idx} rel="stylesheet" type="text/css" />) }
            <title>{page_title}</title>
        </head>
        <body>
        <div id="content" dangerouslySetInnerHTML={ { __html: body } }></div>
        {assets.script.map((href, idx) => <script key={ idx } src={ href }></script>) }
        {GA && <script dangerouslySetInnerHTML={ { __html: GA } }></script>}
        {FB && <script dangerouslySetInnerHTML={ { __html: FB } }></script>}
        </body>
        </html>
    );
}