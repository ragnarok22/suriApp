package com.ragnarokreinier.suri;

import android.content.Intent;
import android.net.Uri;
import android.telephony.TelephonyManager;
import android.content.Context;
import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

public class DirectCallModule extends ReactContextBaseJavaModule {

  private static ReactApplicationContext reactContext;

  DirectCallModule(ReactApplicationContext context) {
    super(context);
    reactContext = context;
  }

  @Override
  public String getName() {
    return "DirectCall";
  }

  @ReactMethod
  public void makeCall(String phoneNumber) {
    try {
      Context context = getReactApplicationContext();
      //
      // Encode the USSD code by replacing # with %23
      String encodedPhoneNumber = phoneNumber.replace("#", Uri.encode("#"));

      Intent intent = new Intent(Intent.ACTION_CALL);
      intent.setData(Uri.parse("tel:" + encodedPhoneNumber));
      intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
      context.startActivity(intent);
    } catch (Exception ex) {
      // callback.invoke(ex.getMessage(), null);
    }
  }
}

