package com.house499.app;

import android.net.Uri;
import android.os.Bundle;
import android.webkit.WebResourceRequest;
import android.webkit.WebView;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.BridgeWebViewClient;

public class MainActivity extends BridgeActivity {
    private static final String APP_HOST = "home.socilet.one";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if (bridge == null) {
            return;
        }

        bridge.setWebViewClient(new BridgeWebViewClient(bridge) {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                Uri uri = request.getUrl();
                if (isHouse499Url(uri)) {
                    return false;
                }
                return super.shouldOverrideUrlLoading(view, request);
            }

            @Override
            @SuppressWarnings("deprecation")
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                Uri uri = Uri.parse(url);
                if (isHouse499Url(uri)) {
                    return false;
                }
                return super.shouldOverrideUrlLoading(view, url);
            }

            private boolean isHouse499Url(Uri uri) {
                return "https".equalsIgnoreCase(uri.getScheme())
                    && APP_HOST.equalsIgnoreCase(uri.getHost());
            }
        });
    }
}
