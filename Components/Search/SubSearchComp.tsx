"use client";

import React, { useEffect, useRef, useState } from "react";

import { HiMiniMagnifyingGlassCircle } from "react-icons/hi2";
import SubResultsComponents from "./SubResults";
import { cn } from "@/lib/utils";
import { useDebouncedCallback } from "use-debounce";
import Link from "next/link";
import type { SubSearchType } from "@/lib/types";
import { subSearchAcion } from "@/lib/action";
import { useRouter, useSearchParams } from "next/navigation";

const SubSearchComponent = () => {
  const searchParams = useSearchParams();
  const [data, setData] = useState<SubSearchType>();
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState<string | undefined>();
  const [sort, setSort] = useState("relevance");
  const router = useRouter();
  console.log(searchParams.get("q"));
  // const debounce = useDebouncedCallback(
  //   (e: React.KeyboardEvent<HTMLInputElement>) => {
  //     if (e.currentTarget.value !== "") {
  //       setValue(e.currentTarget.value);
  //     }
  //   },
  //   2000
  // );

  // const typeHandler = (e: ChangeEvent<HTMLInputElement>) => {
  //   console.log(e);
  //   if (e.target.checked) {
  //     setRedditType("subreddits");
  //   } else if (!e.target.checked || e.target.value === "") {
  //     setRedditType("search");
  //   }
  // };

  // const searchHandler = async (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.code === "Enter") {
  //     setValue(e.currentTarget.value);
  //   }
  // };
  const handleOutsideClick = (e: Event) => {
    const target = e.target as Element;

    if (
      searchRef.current &&
      (!searchRef.current.contains(target) || target.id === "searchResult")
    ) {
      setValue(undefined);
      setData(undefined);
      setSearchOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [searchRef]);

  const searchHandler = async (e: string) => {
    if (e == "") {
      setData(undefined);
      setValue(undefined);
      return;
    }
    if (e !== "") {
      setValue(e);
      const res = await subSearchAcion(e);
      if (res) {
        setData(res);
      }
    }
  };

  const debounced = useDebouncedCallback((e) => searchHandler(e), 1000);

  console.log("Sub Search data: ", data);

  return (
    <div ref={searchRef}>
      <div>
        <div
          className={cn(
            `flex flex-row group bg-pink-900  items-center justify-end overflow-hidden h-auto w-12 my-2 mx-auto  text-red-200 transition-[width] duration-1000`,
            searchOpen !== false ? "w-[40vw] " : " w-12",
            value !== undefined && searchOpen !== false
              ? "rounded-t-3xl"
              : "rounded-3xl"
          )}
        >
          <div
            className={cn(
              "searchInput opacity-0 mx-1  w-full",
              searchOpen !== false && "visible opacity-100 flex flex-row"
            )}
          >
            <input
              autoComplete="off"
              className="bg-none mx-1 border-0 outline-0 w-full "
              placeholder="Search..."
              type="text"
              name="search"
              id="search"
              onChange={(e) => debounced(e.target.value)}
              onKeyUp={(e) => {
                if (e.code === "Enter") {
                  router.push(
                    `/search?q=${e.currentTarget.value}&sort=${sort}`
                  );
                  setSearchOpen(false);
                }
              }}
            />
            <div className={cn("hidden", searchOpen !== false && "inline")}>
              <select
                className="items-center flex flex-col bg-pink-900 border-pink-950"
                onChange={(e) => setSort(e.target.value)}
                defaultValue="relevance"
              >
                <option value="relevance">Relavance</option>

                <option value="hot"> Hot</option>

                <option value="new">New</option>

                <option value="top">Top</option>
              </select>
            </div>
            {/* <div className="items-center flex flex-row px-2 gap-2">
                <label htmlFor="subredditSearch">Show NSFW?</label>
                <input
                  type="checkbox"
                  name="nsfwSearch"
                  id="nsfwSearch"
                  value="nsfw"
                  onChange={(e) => typeHandler(e)}
                />
              </div> */}
          </div>

          <button
            className="searchButton text-5xl flex-none flex justify-center items-center bg-pink-900 rounded-[50%]"
            onClick={(e) => {
              e.preventDefault();

              setSearchOpen(!searchOpen);
              document.getElementById("search")?.focus();
              if (searchOpen) {
                setValue(undefined);
              }
            }}
          >
            <HiMiniMagnifyingGlassCircle />
          </button>
        </div>
      </div>
      {searchOpen && value !== undefined && (
        <div className=" max-w-[40vw] top-14 rounded-b-3xl fixed mx-auto z-40 overflow-x-hidden overflow-y-scroll searchPopup ">
          <div className="bg-pink-800  w-[40vw] flex flex-row cursor-pointer text-[1.250rem] items-center  gap-2 max-h-[100px] h-[50px]">
            <HiMiniMagnifyingGlassCircle className="text-4xl" autoReverse />{" "}
            <Link
              id="searchResult"
              className="w-full"
              href={`/search?q=${value}&sort=${sort}`}
            >
              {value}
            </Link>
          </div>
          {data && data.subreddits[0] !== undefined && (
            <SubResultsComponents redditData={data} />
          )}
        </div>
      )}
    </div>
  );
};

export default SubSearchComponent;
