import { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthContext"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPatients, patchPatient } from "../api/patients";
import { toast } from "react-toastify";
import { handleAPIError } from "../utils/handleAPIError";
import { Link } from "react-router";
import ErrorComponent from "../components/ErrorComponent"
import Skeleton from "react-loading-skeleton";

const Profile = () => {
  const [isEditing, setEditing] = useState(false);
  const [id, setId] = useState(null);
  const { isAuthenticated, user } = useAuth();
  const [fields, setFields] = useState({
    image: null,
    first_name: null,
    last_name: null,
    email: null,
    phone: null,
    address_line1: null,
    address_line2: null,
    gender: null,
    birthday: null,
  });

  const { data, isError, error, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["user-data"],
    queryFn: getPatients,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: patchPatient,
    onSuccess: (data) => {
      toast.success("Your profile has been updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["user-data"] });
      setEditing(false);
    },
    onError: handleAPIError,
  });

  useEffect(() => {
    if (isSuccess) {
      setFields(data.results[0]);
      setId(data.results[0].id);
    }
  }, [isSuccess]);

  const handleClick = (e) => {
    if (!isEditing) setEditing(true);
    else
      mutation.mutate({
        id,
        fields: { ...fields, image: fileInputRef.current.files[0] },
      });
  };

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setFields({ ...fields, image: imgUrl });
    }
  };

  if (user && user.role === "admin") return <p className="w-full flex items-center justify-center text-2xl text-gray-700">Sorry. This page is not intended for admin users.<Link to="/admin" className="text-blue-500">&nbsp;Navigate&nbsp;</Link>to Admin Panel</p>

  return (
    <main className={`font-outfit ${isError ? "w-full" : "w-fit"}`}>
      {
        isError ?
        <div className="w-full h-screen flex items-center justify-center">
          <ErrorComponent
            title={
              "Unable to load user data: " +
                (error?.response?.data?.errors[0]?.code ||
              error.message)
            }
            retry={refetch}
          />
        </div> :
        isLoading ?
        <div className="flex flex-col gap-6">
          <Skeleton width={200} height={200} />
          <Skeleton width={300} height={28} />
          <hr className="text-gray-300"/>
          <div className="flex flex-col gap-2">
            <Skeleton width={620}  height={14}/>
            <Skeleton width={620}  height={14}/>
            <Skeleton width={620}  height={14}/>
            <Skeleton width={620}  height={14}/>
            <Skeleton width={620}  height={14}/>
            <Skeleton width={620}  height={14}/>
          </div>
        </div> :
        <>
          <div>
            <img
              src={fields.image}
              onClick={() => fileInputRef.current.click()}
              className="rounded-md size-36 border cursor-pointer border-gray-200"
            />
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              disabled={!isEditing}
              onChange={handleFileChange}
            />
          </div>
          <div>
            <h3 className="text-[#1F2937] flex gap-4 font-medium text-3xl mt-8 mb-3">
              {isEditing ? (
                <>
                  <input
                    id="first_name"
                    type="text"
                    value={fields.first_name}
                    className="outline-none"
                    placeholder="Firstname"
                    onChange={(e) =>
                      setFields({ ...fields, first_name: e.target.value })
                    }
                  />
                  <input
                    id="last_name"
                    type="text"
                    value={fields.last_name}
                    className="outline-none"
                    placeholder="Lastname"
                    onChange={(e) =>
                      setFields({ ...fields, last_name: e.target.value })
                    }
                  />
                </>
              ) : (
                fields.first_name + " " + fields.last_name
              )}
            </h3>
            <hr className="text-gray-300" />
            <div className="mt-5">
              <h2 className="underline text-[#797979] mb-3">CONTACT INFORMATION</h2>
              <div className="flex flex-col gap-2 text-lg">
                <div className="grid grid-cols-2">
                  <label htmlFor="email" className="text-[#4B5563]">
                    Email id:
                  </label>
                  {
                    isEditing ?
                      <input
                        id="email"
                        type="email"
                        value={fields.email}
                        className="outline-none text-[#6B7280]"
                        placeholder="Email"
                        onChange={(e) =>
                          setFields({ ...fields, email: e.target.value })
                        }
                      /> :
                      <p className="text-blue-400">{fields.email}</p>
                  }
                </div>
                <div className="grid grid-cols-2">
                  <label htmlFor="phone" className="text-[#4B5563]">
                    Phone:
                  </label>
                  {
                    isEditing ?
                      <input
                        id="phone"
                        type="tel"
                        value={fields.phone}
                        className="outline-none text-blue-400"
                        placeholder="Phone"
                        onChange={(e) =>
                          setFields({ ...fields, phone: e.target.value })
                        }
                      />
                    :
                    <p className="text-blue-400">{fields.phone}</p>
                  }
                </div>
                <div className="grid grid-cols-2">
                  <label htmlFor="address_line1" className="text-[#4B5563]">
                    Address:
                  </label>
                  <div className="flex flex-col text-[#6B7280]">
                    {
                      isEditing ? <>
                        <input
                          id="address_line1"
                          type="text"
                          value={fields.address_line1}
                          className={`outline-none`}
                          placeholder="Address Line 1"
                          onChange={(e) =>
                            setFields({ ...fields, address_line1: e.target.value })
                          }
                        />
                        <input
                          id="address_line2"
                          type="text"
                          value={fields.address_line2}
                          className={`outline-none`}
                          placeholder="Address Line 2"
                          onChange={(e) =>
                            setFields({ ...fields, address_line2: e.target.value })
                          }
                        />
                      </> :
                      <>
                        <p>{fields.address_line1}</p>
                        <p>{fields.address_line2}</p>
                      </>
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <h2 className="underline text-[#797979] mb-3">BASIC INFORMATION</h2>
              <div className="flex flex-col gap-2 text-lg">
                <div className="grid grid-cols-2">
                  <label htmlFor="gender" className="text-[#4B5563]">
                    Gender:
                  </label>
                  {
                    isEditing ?
                    <input
                      id="gender"
                      type="text"
                      value={fields.gender}
                      className="outline-none text-[#6B7280]"
                      placeholder="Gender (Male, Female, Other)"
                      onChange={(e) =>
                        setFields({ ...fields, gender: e.target.value })
                      }
                    /> :
                    <p className="text-[#6B7280]">{fields.gender}</p>
                  }
                </div>
                <div className="grid grid-cols-2">
                  <label htmlFor="birthday" className="text-[#4B5563]">
                    Birthday:
                  </label>
                  {
                    isEditing ?
                    <input
                      id="birthday"
                      type="date"
                      value={fields.birthday}
                      className="outline-none text-[#6B7280]"
                      placeholder="Birthday"
                      onChange={(e) =>
                        setFields({ ...fields, birthday: e.target.value })
                      }
                    /> :
                    <p className="text-[#6B7280]">{fields.birthday}</p>
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-6 mt-12">
            <button
              className="rounded-full cursor-pointer py-2 px-10 text-[#4B5563] border-primary border text-lg"
              onClick={handleClick}
            >
              {isEditing ? "Save" : "Edit"}
            </button>
          </div> 
        </>
      }
    </main>
  );
};

export default Profile;
