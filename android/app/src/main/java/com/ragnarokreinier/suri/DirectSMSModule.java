package com.ragnarokreinier.suri;

import android.content.IntentFilter;
import android.content.Context;
import android.telephony.SmsManager;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.Callback;

public class DirectSMSModule extends ReactContextBaseJavaModule implements LifecycleEventListener {

  private static ReactApplicationContext reactContext;
  private SMSReceiver smsReceiver;

  DirectSMSModule(ReactApplicationContext context) {
    super(context);
    reactContext = context;
    reactContext.addLifecycleEventListener(this);

    // Register the SMS receiver
    smsReceiver = new SMSReceiver(context);
    IntentFilter filter = new IntentFilter("android.provider.Telephony.SMS_RECEIVED");
    reactContext.registerReceiver(smsReceiver, filter);
  }

  @Override
  public String getName() {
    return "DirectSMS";
  }

  @ReactMethod
  public void sendSMS(String phoneNumber, String message) {
    try {
      SmsManager smsManager = SmsManager.getDefault();
      smsManager.sendTextMessage(phoneNumber, null, message, null, null);
      // callback.invoke(null, "SMS Sent");
    } catch (Exception ex) {
      // callback.invoke(ex.getMessage(), null);
    }
  }

  @Override
  public void onHostResume() {
    // Register the receiver again when the app comes to the foreground
    IntentFilter filter = new IntentFilter("android.provider.Telephony.SMS_RECEIVED");
    reactContext.registerReceiver(smsReceiver, filter);
  }

  @Override
  public void onHostPause() {
    // Unregister the receiver when the app is in the background to save resources
    reactContext.unregisterReceiver(smsReceiver);
  }

  @Override
  public void onHostDestroy() {
    // Clean up the receiver if the app is destroyed
    if (smsReceiver != null) {
      reactContext.unregisterReceiver(smsReceiver);
    }
  }
}
