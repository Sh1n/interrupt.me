/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();

        app.fbId = '750502531648621';
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);

        console.log('Received Event: ' + id);

        var serviceName = 'co.pouz.InterruptMeBgService';
        var factory = cordova.require('com.red_folder.phonegap.plugin.backgroundservice.BackgroundService');
        interruptBgService = factory.create(serviceName);
        
        //goBgService();
    }
};


function goBgService() {
    interruptBgService.getStatus(function(r){ startService(r); }, function(e){ displayError(e); });
    //interruptBgService.registerForBootStart(function(r){ startService(r); }, function(e){ displayError(e); });
};




function getStatus()
{
    interruptBgService.getStatus(function(r){ displayResult(r); }, function(e){ displayError(e); });
}


function displayResult(data)
{
    alert("Is service running: " + data.ServiceRunning);
}


function displayError(data)
{
    alert("We have an error");
}


function updateHandler(data)
{
    if (data.LatestResult != null)
    {
        try {
            var resultMessage = document.getElementById("resultMessage");
            resultMessage.innerHTML = data.LatestResult.Message;
            
            //navigator.notification.beep(1);
            //navigator.notification.vibrate(2000);
            alert('hey');
            alert(data.LatestResult.Message);
            
            /*navigator.notification.alert(
                'You are the winner!',  // message
                alertDismissed,         // callback
                'Game Over',            // title
                'Done'                  // buttonName
            );*/
        }
        catch (err) {}
    }
}



function startService(data)
{
    if (data.ServiceRunning)
        //enableTimer(data);
        registerForUpdates(data);
    else
        //interruptBgService.startService(function(r){ enableTimer(r); }, function(e){ displayError(e); });
        interruptBgService.startService(function(r){ registerForUpdates(r); }, function(e){ displayError(e); });
}


function enableTimer(data)
{
    if (data.TimerEnabled)
        registerForUpdates(data);
    else
        interruptBgService.enableTimer(60000, function(r){ registerForUpdates(r); }, function(e){ displayError(e); });
}


function registerForUpdates(data)
{
    if (!data.RegisteredForUpdates)
    {
        interruptBgService.registerForUpdates(function(r){ updateHandler(r); }, function(e){ handleError(e); });
    }
}

