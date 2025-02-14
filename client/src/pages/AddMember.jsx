import React from "react";
import { useToPng } from "@hugocxl/react-to-image";
import {
  Input,
  Image,
  Autocomplete,
  AutocompleteItem,
  Form,
  Button,
  Alert,
} from "@heroui/react";
import {
  FaCamera,
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
} from "react-icons/fa";

const designations = [
  { label: "Coordinator", value: "coordinator" },
  { label: "Assistant Coordinator", value: "asst_coordinator" },
  { label: "Domain Lead", value: "domain_lead" },
  { label: "Assistant Domain Lead", value: "asst_domain_lead" },
  { label: "Member", value: "member" },
];

const domains = [
  { label: "Web Development", value: "web_dev" },
  { label: "Android Development", value: "android" },
  { label: "UI/UX", value: "ui_ux" },
  { label: "Graphic Designing", value: "graphic" },
  { label: "AI/ML", value: "ml" },
  { label: "AR/VR & Game Development", value: "arvr_game" },
  { label: "Java", value: "java" },
  { label: "IoT & Embedded", value: "iot" },
  { label: "Cloud Computing", value: "cloud" },
  { label: "Marketing & PR", value: "marketing" },
  { label: "Content Writing", value: "content" },
  { label: "Photography & Video Editing", value: "photography" },
  { label: "Cyber Security", value: "cyber_sec" },
  { label: "Data Analytics", value: "data_anal" },
];

const AddMember = () => {
  const [submitted, setSubmitted] = React.useState(null);
  const [previewUrl, setPreviewUrl] = React.useState(null);
  const [name, setName] = React.useState("");
  const [domain, setDomain] = React.useState("");
  const [idCard, setIdCard] = React.useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const [state, convert] = useToPng({
    selector: "#id-card",
    onSuccess: (data) => {
      const link = document.createElement("a");
      link.download = `${submitted.name}_${submitted.domain}.png`;
      link.href = data;
      link.click();
    },
    onError: (error) => {
      console.error("Error converting to PNG:", error);
    },
  });

  React.useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  React.useEffect(() => {
    if (submitted) {
      console.log(submitted);
      setName(submitted.name);
      setDomain(submitted.domain);
      // Call backend API to submit data
    }
  }, [submitted]);

  const onSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setSubmitted(data);
  };

  return (
    <div className="container mx-auto px-5 h-screen w-full dark">
      <div className="py-20">
        <div className="flex w-full items-center justify-center">
          <h1 className="text-textColor1 text-4xl md:text-5xl font-bold text-center w-full">
            Member Details
          </h1>
        </div>
        <div className="mt-10 rounded-xl border-textColor1 border-2 py-16 px-10 flex flex-col items-center justify-center gap-14 overflow-x-hidden w-full">
          <Form
            className="w-full flex flex-col items-center justify-center gap-14"
            validationBehavior="native"
            onReset={() => {
              setPreviewUrl(null);
              setSubmitted(null);
              setIdCard(false);
            }}
            onSubmit={onSubmit}
          >
            <div className="w-full flex flex-row flex-wrap-reverse items-center justify-between gap-10">
              <div className="flex w-full md:w-[50%] flex-col gap-6 items-center justify-center">
                <Input
                  label="Full Name"
                  variant="bordered"
                  isClearable
                  name="name"
                  color="warning"
                  isRequired
                  classNames={{ label: "text-md" }}
                ></Input>
                <Autocomplete
                  label="Designation"
                  variant="bordered"
                  color="warning"
                  name="designation"
                  isRequired
                  classNames={{ popoverContent: "dark font-varela" }}
                  inputProps={{
                    classNames: {
                      label: "text-md",
                    },
                  }}
                >
                  {designations.map((item) => (
                    <AutocompleteItem
                      key={item.value}
                      value={item.value}
                      variant="faded"
                      color="warning"
                      classNames={{ title: "text-md" }}
                    >
                      {item.label}
                    </AutocompleteItem>
                  ))}
                </Autocomplete>
                <Autocomplete
                  label="Domain"
                  variant="bordered"
                  color="warning"
                  name="domain"
                  isRequired
                  classNames={{ popoverContent: "dark font-varela" }}
                  inputProps={{
                    classNames: {
                      label: "text-md",
                    },
                  }}
                >
                  {domains
                    .sort((d1, d2) => d1.label.localeCompare(d2.label))
                    .map((item) => (
                      <AutocompleteItem
                        key={item.value}
                        value={item.value}
                        color="warning"
                        variant="faded"
                        classNames={{ title: "text-md" }}
                      >
                        {item.label}
                      </AutocompleteItem>
                    ))}
                </Autocomplete>
                <Input
                  label="LinkedIn Profile"
                  variant="bordered"
                  isClearable
                  name="linkedin"
                  color="warning"
                  classNames={{ label: "text-md" }}
                  startContent={
                    <FaLinkedinIn className="text-lg text-textColor1" />
                  }
                  type="url"
                ></Input>
                <Input
                  label="GitHub Profile"
                  variant="bordered"
                  isClearable
                  name="github"
                  color="warning"
                  classNames={{ label: "text-md" }}
                  startContent={
                    <FaGithub className="text-lg text-textColor1" />
                  }
                  type="url"
                ></Input>
                <Input
                  label="Instagram Profile"
                  name="instagram"
                  variant="bordered"
                  isClearable
                  color="warning"
                  classNames={{ label: "text-md" }}
                  startContent={
                    <FaInstagram className="text-lg text-textColor1" />
                  }
                  type="url"
                ></Input>
              </div>

              <div className="flex w-full md:w-[40%] flex-col gap-6 items-center justify-center">
                <Image
                  className="object-cover flex min-w-[70px] h-[180px] shadow-lg shadow-textColor1 mb-6"
                  src={
                    previewUrl ||
                    "https://t3.ftcdn.net/jpg/00/64/67/80/360_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.webp"
                  }
                  alt="member_image"
                  radius="lg"
                />
                <Input
                  label="Upload Image"
                  isRequired
                  name="image"
                  variant="flat"
                  size="lg"
                  labelPlacement="outside"
                  isClearable
                  color="warning"
                  classNames={{ label: "text-md" }}
                  startContent={
                    <FaCamera className="text-lg text-textColor1" />
                  }
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                ></Input>
                <Input
                  label="KIIT Email Address"
                  variant="bordered"
                  isClearable
                  isRequired
                  name="email"
                  color="warning"
                  classNames={{ label: "text-md" }}
                  startContent={
                    <FaEnvelope className="text-lg text-textColor1" />
                  }
                  type="email"
                ></Input>
                <Input
                  label="Phone Number"
                  variant="bordered"
                  isClearable
                  isRequired
                  name="phone"
                  color="warning"
                  classNames={{ label: "text-md" }}
                  startContent={
                    <FaPhoneAlt className="text-lg text-textColor1" />
                  }
                  type="tel"
                ></Input>
              </div>
            </div>

            <div className="flex w-full items-center justify-center gap-10">
              <Button
                className="w-full max-w-[250px] hover:scale-105 transition-all ease-in-out duration-200 font-bold text-xl"
                type="submit"
                variant="shadow"
                color="warning"
                radius="lg"
                size="lg"
              >
                Submit
              </Button>
              <Button
                className="w-full max-w-[250px] hover:scale-105 transition-all ease-in-out duration-200 font-bold text-xl"
                type="reset"
                variant="faded"
                radius="lg"
                color="warning"
                size="lg"
              >
                Reset
              </Button>
            </div>
          </Form>

          {submitted && (
            <Alert
              color="success"
              className="w-full -mt-4"
              classNames={{ title: "text-base sm:text-lg" }}
              radius="lg"
              variant="faded"
            >
              <div className="flex w-full flex-row flex-wrap justify-between gap-2 items-center">
                <h1 className="flex text-md sm:text-lg text-left font-semibold">
                  Details Submitted Successfully!
                </h1>
                <Button
                  variant="shadow"
                  color="success"
                  radius="sm"
                  size="sm"
                  className="flex"
                  onPress={() => {
                    setIdCard(true), convert();
                  }}
                >
                  <h1 className="text-wrap text-center font-medium">
                    Download Virtual ID
                  </h1>
                </Button>
              </div>
            </Alert>
          )}

          <div
            className="flex flex-col w-[591px] h-[1004px] items-center justify-between bg-[url(/ID_Card.png)] bg-cover"
            id="id-card"
          >
            <div className="flex w-full h-[54.7%] items-end justify-center">
              <Image
                className="object-cover flex object-center aspect-square mb-7"
                src={
                  previewUrl ||
                  "https://t3.ftcdn.net/jpg/00/64/67/80/360_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.webp"
                }
                alt="member_image"
                width={370}
                radius="full"
              />
            </div>
            <div className="flex w-full h-[45.3%] justify-start items-start pt-8">
              <div className="w-[72%] h-[55%] flex flex-col gap-6 pl-6">
                <div className="flex w-full">
                  <h1 className="text-[28px] font-horizon text-textColor2 text-left">
                    {name}
                  </h1>
                </div>
                <div className="flex w-full">
                  <h1 className="text-[22px] font-horizon text-textColor1 text-left">
                    {domain}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMember;
