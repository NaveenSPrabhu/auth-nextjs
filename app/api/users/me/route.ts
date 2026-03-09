import { getDataFromToken } from "@/helper/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/modules/userModel";
import {connect} from "@/dbconfig/dbConfig";
import { get, request } from "http";

connect();

export async function GET(req: NextRequest) {
        try{
            const userId = await getDataFromToken(req);
            const user = await User.findOne({_id: userId}).
            select("-password -isadmin");
            return NextResponse.json({message: "User data fetched successfully", user}, {status: 200});
        }
        catch(err: any){
            return NextResponse.json({message: err.message}, {status: 500});
        }
}