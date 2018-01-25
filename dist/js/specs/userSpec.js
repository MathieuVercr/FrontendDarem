describe("application", () => {
  var currentUser;

  beforeEach(() => {
    //jasmine.addMatchers(customMatchers);
    currentUser = window.sessionStorage.getItem('nmct.darem.user');

  });

  it("has user in session storage", () => {
    expect(currentUser).not.toBeNull();
    expect(currentUser.facebook).not.toBeNull();
    
  });



});
