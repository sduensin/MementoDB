# MementoDB
Scripts for Memento Database (https://mementodatabase.com/)

Uses code from:

* https://momentjs.com

This main directory contains code useful for testing scripts intended to run
inside the Memento Database with a web browser or other JavaScript runtime.

* http.js - Emulates the Memento `http().get()` method
* moment.js - Un-minimized copy of Moment (included as a built-in library with Memento)

Directories under this one are the separate projects that result in "bundles" of
code you can import into Memento.  More documentation is available there.

Currently available projects:

* TgdbAutofill.js - Autofill for The Games DB
