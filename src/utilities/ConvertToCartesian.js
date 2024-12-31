// + https://www.geeksforgeeks.org/program-to-convert-polar-co-ordinates-to-equivalent-cartesian-co-ordinates/ 

// JavaScript code of above approach

// Function to convert degree to radian
function ConvertDegToRad(degree)
{
    let pi = 3.14159;
    return (degree * (pi / 180.0));
}

// Function to convert the polar
    // coordinate to cartesian
export function ConvertToCartesian(polar)
{
    // Convert degrees to radian
    polar[1] = ConvertDegToRad(
        polar[1]);
    
    // Applying the formula:
    // x = rcos(theta), y = rsin(theta)
    let cartesian
        = [ polar[0] * Math.cos(polar[1]),
            polar[0] * Math.sin(polar[1]) ];
    
    // Print cartesian coordinates
    // document.write((cartesian[0]).toFixed(3)+", "
    // +(cartesian[1]).toFixed(3));

    return cartesian;
}

// Driver code
let polar=[1.4142, 45 ];
// Function to convert polar
// coordinates to equivalent
// cartesian coordinates
// ConvertToCartesian(polar);

// This code is contributed by avanitrachhadiya2155