export class Boat {
    constructor({ hasMotor, motorCount, motorBrand, motorModel, hasSaills, sailsCount,
        sailsMaterial, sailsColor, hullColor, hasCabin }) {
            this.hasMotor = hasMotor;
            this.motorCount = motorCount;
            this.motorBrand = motorBrand;
            this.motorModel = motorModel;
            this.hasSaills = hasSaills;
            this.sailsCount = sailsCount;
            this.sailsMaterial = sailsMaterial;
            this.sailsColor = sailsColor;
            this.hullColor = hullColor;
            this.hasCabin = hasCabin;
    }

    doSomething () {
        return this;
    }
}