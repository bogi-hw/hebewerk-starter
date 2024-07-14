# Application database model

This folder containes classes or types of which its instances get stored in the database file (usually /db/db.json) and therefore persist a restart. 

`ApplicationData` is the root class. From there, you can access everything else. Obtain it with for example with:
````typescript
import {Application} from "./Application.js"
application.data.getApplesWithoutWorm() // application.data retrieves the one-and-only ApplicationData instance 
````

