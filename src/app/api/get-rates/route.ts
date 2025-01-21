import { shipEngine } from "@/helper/shipEngine";
import { Address, Package } from "@/helper/type";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    console.log("ShipEngine object:", shipEngine); // Debugging line

    const {
      shipeToAddress,
      packages,
    }: { shipeToAddress: Address; packages: Package[] } = await req.json();

    console.log("Received request with data:", { shipeToAddress, packages });

    if (!shipeToAddress || !packages) {
      console.error("Missing required fields: shipeToAddress and packages");
      return NextResponse.json(
        { error: "Missing required fields: shipeToAddress and packages" },
        { status: 400 }
      );
    }

    const shipFromAddress: Address = {
      name: "Maryam Anwar",
      phone: "+92 3131113447",
      addressLine1: "456 Oak Avenue",
      addressLine2: "Suite 200",
      cityLocality: "Los Angeles",
      stateProvince: "CA",
      postalCode: "90001",
      countryCode: "US",
      addressResidentialIndicator: "no",
    };

    console.log("Ship From Address:", shipFromAddress);

    const shipmentDetails = await shipEngine.getRatesWithShipmentDetails({
      shipment: {
        shipTo: shipeToAddress,
        shipFrom: shipFromAddress,
        packages: packages,
      },
      rateOptions: {
        carrierIds: [
          process.env.SHIPENGINE_FIRST_COURIER || "",
          process.env.SHIPENGINE_SECOND_COURIER || "",
          process.env.SHIPENGINE_THIRD_COURIER || "",
          process.env.SHIPENGINE_FOURTH_COURIER || "",
        ].filter(Boolean),
      },
    });

    console.log("Shipment Details:", shipmentDetails);

    return NextResponse.json(
      { shipeToAddress, packages, shipmentDetails },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in get-rates route:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching shipping rates", details: (error instanceof Error ? error.message : String(error)) },
      { status: 500 }
    );
  }
}