package com.ragnarokreinier.suri;

import android.telephony.SmsManager;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;


public class DirectSMSModule extends ReactContextBaseJavaModule {
  public DirectSMSModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return "DirectSMS";
  }

  @ReactMethod
  public boolean sendSMS(String phoneNumber, String msg) {
    try {
      SmsManager smsManager = SmsManager.getDefault();
      smsManager.sendTextMessage(phoneNumber, null, msg, null, null);
      return true;
    } catch (Exception e) {
      return false;
    }
  }
}
