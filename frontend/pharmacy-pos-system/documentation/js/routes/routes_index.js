var ROUTES_INDEX = {"name":"<root>","kind":"module","className":"AppModule","children":[{"name":"routes","filename":"src/app/app-routing.module.ts","module":"AppRoutingModule","children":[{"path":"","component":"DefaultComponent","children":[{"path":"","component":"DashboardComponent","canActivate":["AuthGuard"]},{"path":"inventory","component":"InventoryComponent","canActivate":["AuthGuard"]},{"path":"login","component":"LoginComponent"},{"path":"register","component":"RegisterComponent","canActivate":["ManagerGuard"]},{"path":"stock-management","component":"ManagementComponent","canActivate":["AuthGuard"]},{"path":"settings","component":"SettingsComponent","canActivate":["ManagerGuard"]},{"path":"pos","component":"PointOfSaleComponent","canActivate":["AuthGuard"]},{"path":"transactions","component":"TransactionsComponent","canActivate":["AuthGuard"]},{"path":"users","component":"UsersComponent","canActivate":["ManagerGuard"]}]}],"kind":"module"}]}