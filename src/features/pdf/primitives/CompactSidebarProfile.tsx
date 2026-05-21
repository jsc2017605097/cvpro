import { Image, Text, View } from "@react-pdf/renderer";
import type { CVData } from "@/schemas/cv.schema";
import { pdfStyles } from "../tokens";

function isValidAvatarUrl(url: string | undefined): url is string {
  if (!url) return false;
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

export function CompactSidebarProfile({
  personal,
}: {
  personal: CVData["personal"];
}) {
  const showImage = isValidAvatarUrl(personal.avatarUrl);

  return (
    <View style={{ alignItems: "center", marginBottom: 8 }}>
      <Text style={pdfStyles.compactProfileName}>{personal.fullName}</Text>
      {personal.title ? (
        <Text style={pdfStyles.compactProfileTitle}>{personal.title}</Text>
      ) : null}
      {showImage ? (
        <Image src={personal.avatarUrl} style={pdfStyles.compactAvatar} />
      ) : (
        <View style={pdfStyles.compactAvatarPlaceholder} />
      )}
    </View>
  );
}
