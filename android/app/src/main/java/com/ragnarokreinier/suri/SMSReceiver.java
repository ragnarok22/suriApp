package com.ragnarokreinier.suri;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.telephony.SmsMessage;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class SMSReceiver extends BroadcastReceiver {

    private static final String SMS_RECEIVED = "android.provider.Telephony.SMS_RECEIVED";
    private static ReactApplicationContext reactContext;

    public SMSReceiver(ReactApplicationContext context) {
        reactContext = context;
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        Log.d("SMSReceiver", "onReceive triggered");
        if (intent.getAction().equals(SMS_RECEIVED)) {
            Log.d("SMSReceiver", "SMS Received Intent Detected");
            Bundle bundle = intent.getExtras();
            if (bundle != null) {
                Object[] pdus = (Object[]) bundle.get("pdus");
                if (pdus != null) {
                    SmsMessage[] messages = new SmsMessage[pdus.length];
                    for (int i = 0; i < pdus.length; i++) {
                        messages[i] = SmsMessage.createFromPdu((byte[]) pdus[i]);
                    }
                    String sender = messages[0].getOriginatingAddress();
                    String message = "";
                    for (SmsMessage sms : messages) {
                        message += sms.getMessageBody();
                    }
                    sendEvent(sender, message);
                }
            }
        }
    }

    private void sendEvent(String sender, String message) {
        WritableMap params = Arguments.createMap();
        params.putString("sender", sender);
        params.putString("message", message);
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit("SMSReceived", params);
    }
}

