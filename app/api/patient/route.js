import connectMongodb from "@/libs/mongodb";
import Patient from "@/models/patient";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectMongodb();
  try {
    const { name, dob, gender, contact, email, address, insurance } =
      await request.json();
    const existingPatientWithEmail = await Patient.findOne({ email });
    const existingPatientWithContact = await Patient.findOne({ contact });
    if (existingPatientWithEmail) {
      return new Response(
        JSON.stringify({
          message: "Patient with the same email already exists",
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 500,
        }
      );
    }
    if (existingPatientWithContact) {
      return new Response(
        JSON.stringify({
          message: "Patient with the same contact already exists",
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 500,
        }
      );
    }

    await Patient.create({
      name,
      dob: new Date(dob), // Parse the date string to a Date object
      gender,
      contact,
      email,
      address,
      insurance,
    });

    return new Response(JSON.stringify({ message: "Patient created" }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error creating a patient:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
export async function GET() {
  await connectMongodb();
  const patient = await Patient.find();
  return NextResponse.json({ patient });
}
